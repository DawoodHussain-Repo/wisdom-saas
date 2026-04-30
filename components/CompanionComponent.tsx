"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  duration,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState(duration * 60);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Session complete state
  const [showComplete, setShowComplete] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Lottie animation control
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handle session completion
  const handleSessionComplete = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Calculate actual session duration
    if (sessionStartTime) {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      setSessionDuration(elapsed);
    }

    setCallStatus(CallStatus.FINISHED);
    setShowComplete(true);
    addToSessionHistory(companionId);

    // Stop VAPI if still running
    try {
      vapi.stop();
    } catch {
      // Already stopped
    }
  }, [sessionStartTime, companionId]);

  // Timer countdown
  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Time's up — end session gracefully
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

  // VAPI event listeners
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setSessionStartTime(Date.now());
      setSecondsRemaining(duration * 60);
    };

    const onCallEnd = () => {
      if (callStatus !== CallStatus.FINISHED) {
        handleSessionComplete();
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => {
      console.log("Error", error);
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
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setShowComplete(false);
    setMessages([]);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error - vapi types mismatch
    vapi.start(configureAssistant(voice, style, duration), assistantOverrides);
  };

  const handleDisconnect = () => {
    handleSessionComplete();
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Format session duration as Xm Ys
  const formatSessionDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Timer status
  const timerStatus =
    secondsRemaining <= 30
      ? "critical"
      : secondsRemaining <= 120
        ? "warning"
        : "";

  return (
    <>
      <section className="flex flex-col h-[70vh]">
        {/* Timer bar — visible during active session */}
        {callStatus === CallStatus.ACTIVE && (
          <div className="flex justify-center mb-4 animate-fadeInUp">
            <div className={`session-timer ${timerStatus}`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatTime(secondsRemaining)} remaining
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
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING &&
                    "opacity-100 animate-pulse",
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
            <p
              className="font-bold text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              {name}
            </p>
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
              <p
                className="font-bold text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                {userName}
              </p>
            </div>
            <button
              className="btn-mic"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
              id="toggle-microphone"
            >
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="mic"
                width={36}
                height={36}
              />
              <p className="max-sm:hidden" style={{ color: "var(--text-secondary)" }}>
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2.5 cursor-pointer transition-all duration-200 w-full text-white flex items-center justify-center gap-2 font-medium",
                callStatus === CallStatus.ACTIVE
                  ? "bg-red-600 hover:bg-red-700"
                  : "btn-primary justify-center",
                callStatus === CallStatus.CONNECTING && "opacity-80 cursor-wait",
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
              disabled={callStatus === CallStatus.CONNECTING}
              id="session-control-button"
            >
              {callStatus === CallStatus.CONNECTING ? (
                <>
                  <Loader2 className="animate-spin" />
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
            {messages.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <p key={index} className="max-sm:text-sm">
                    <span style={{ color: "var(--accent-amber)" }}>
                      {name.split(" ")[0].replace("/[.,]/g, ", "")}:
                    </span>{" "}
                    {message.content}
                  </p>
                );
              } else {
                return (
                  <p
                    key={index}
                    className="max-sm:text-sm"
                    style={{ color: "var(--accent-violet)" }}
                  >
                    <span className="font-semibold">{userName}:</span>{" "}
                    {message.content}
                  </p>
                );
              }
            })}
          </div>

          <div className="transcript-fade" />
        </section>
      </section>

      {/* Session Complete Overlay */}
      {showComplete && (
        <div className="session-complete-overlay" id="session-complete-overlay">
          <div className="session-complete-card">
            {/* Success icon */}
            <div
              className="flex items-center justify-center rounded-full size-16"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "2px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Session Complete!
            </h2>

            <div
              className="flex gap-8"
              style={{ color: "var(--text-secondary)" }}
            >
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--accent-amber)" }}
                >
                  {formatSessionDuration(sessionDuration)}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Duration
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--accent-violet)" }}
                >
                  {messages.length}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Messages
                </span>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)" }}>
              Great session on <strong>{topic}</strong>! Keep the momentum going.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowComplete(false);
                  setCallStatus(CallStatus.INACTIVE);
                  setSecondsRemaining(duration * 60);
                }}
                className="btn-primary flex-1 justify-center"
                id="start-new-session"
              >
                New Session
              </button>
              <Link
                href="/companions"
                className="btn-signin flex-1 justify-center text-center"
                id="back-to-library"
              >
                Back to Library
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanionComponent;
