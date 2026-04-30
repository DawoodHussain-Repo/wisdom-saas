"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Link from "next/link";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { Loader2, Clock, CheckCircle2, ArrowLeft } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const WARNING_THRESHOLD_SECONDS = 120;
const CRITICAL_THRESHOLD_SECONDS = 30;

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function getTimerStatus(seconds: number): string {
  if (seconds <= CRITICAL_THRESHOLD_SECONDS) return "critical";
  if (seconds <= WARNING_THRESHOLD_SECONDS) return "warning";
  return "";
}

export default function CompanionComponent({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  duration,
}: CompanionComponentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(duration * 60);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSpeaking) lottieRef.current?.play();
    else lottieRef.current?.stop();
  }, [isSpeaking]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSessionComplete = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (sessionStartTime) {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
    }

    setCallStatus(CallStatus.FINISHED);
    setShowComplete(true);
    addToSessionHistory(companionId);

    try { vapi.stop(); } catch { /* already stopped */ }
  }, [sessionStartTime, companionId]);

  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (callStatus !== CallStatus.ACTIVE && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [callStatus, handleSessionComplete]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setSessionStartTime(Date.now());
      setSecondsRemaining(duration * 60);
    };

    const onCallEnd = () => {
      if (callStatus !== CallStatus.FINISHED) handleSessionComplete();
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          { role: message.role, content: message.transcript },
          ...prev,
        ]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.error("Vapi error:", error);
      setCallStatus(CallStatus.INACTIVE);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companionId, duration, handleSessionComplete]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setShowComplete(false);
    setMessages([]);

    // @ts-expect-error - vapi types mismatch
    vapi.start(configureAssistant(voice, style, duration), {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    });
  };

  const resetSession = () => {
    setShowComplete(false);
    setCallStatus(CallStatus.INACTIVE);
    setSecondsRemaining(duration * 60);
  };

  return (
    <>
      <section className="flex flex-col h-[70vh]">
        {callStatus === CallStatus.ACTIVE && (
          <div className="flex justify-center mb-4">
            <div className={`session-timer ${getTimerStatus(secondsRemaining)}`}>
              <Clock size={14} />
              {formatTimer(secondsRemaining)} remaining
            </div>
          </div>
        )}

        <section className="flex gap-8 max-sm:flex-col">
          <div className="companion-section">
            <div
              className="companion-avatar"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-0" : "opacity-100",
                  callStatus === CallStatus.CONNECTING && "animate-pulse",
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={150}
                  height={150}
                  className="max-sm:w-fit"
                />
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="companion-lottie"
                />
              </div>
            </div>
            <p className="font-bold text-2xl">{name}</p>
          </div>

          <div className="user-section">
            <div className="user-avatar">
              <Image
                src={userImage}
                alt={userName}
                width={130}
                height={130}
                className="rounded-lg"
              />
              <p className="font-bold text-2xl">{userName}</p>
            </div>
            <button
              className="btn-mic"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="Microphone toggle"
                width={36}
                height={36}
              />
              <p className="max-sm:hidden">
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2 cursor-pointer transition-colors w-full text-white flex items-center justify-center gap-2",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "opacity-80 cursor-wait",
              )}
              onClick={callStatus === CallStatus.ACTIVE ? handleSessionComplete : handleCall}
              disabled={callStatus === CallStatus.CONNECTING}
            >
              {callStatus === CallStatus.CONNECTING ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Connecting...
                </>
              ) : callStatus === CallStatus.ACTIVE ? (
                "End Session"
              ) : callStatus === CallStatus.FINISHED ? (
                "Start New Session"
              ) : (
                "Start Session"
              )}
            </button>
          </div>
        </section>

        <section className="transcript">
          <div className="transcript-message no-scrollbar">
            {messages.map((message, index) => (
              <p
                key={index}
                className={cn(
                  "max-sm:text-sm",
                  message.role === "user" && "text-[var(--color-accent)]",
                )}
              >
                <span className="font-semibold">
                  {message.role === "assistant"
                    ? name.split(" ")[0].replace(/[.,]/g, "")
                    : userName}
                  :
                </span>{" "}
                {message.content}
              </p>
            ))}
          </div>
          <div className="transcript-fade" />
        </section>
      </section>

      {showComplete && (
        <div className="session-complete-overlay">
          <div className="session-complete-card">
            <CheckCircle2 size={48} className="text-green-600" />
            <h2 className="text-2xl">Session Complete!</h2>

            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-[var(--color-accent)]">
                  {formatDuration(sessionDuration)}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">Duration</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold">{messages.length}</span>
                <span className="text-sm text-[var(--color-text-muted)]">Messages</span>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)]">
              Great session on <strong>{topic}</strong>. Keep it up!
            </p>

            <div className="flex gap-3 w-full">
              <button onClick={resetSession} className="btn-primary flex-1 justify-center">
                New Session
              </button>
              <Link href="/companions" className="btn-signin flex-1 justify-center text-center">
                <ArrowLeft size={14} />
                Library
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
