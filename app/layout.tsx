import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso — AI-Powered Learning Companions",
  description:
    "Learn anything with personalized AI voice companions. Interactive real-time sessions for Maths, Science, Coding, History, Language and more.",
  keywords: [
    "AI tutor",
    "learning companion",
    "voice learning",
    "AI education",
    "online tutoring",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#f59e0b",
          colorBackground: "#12121a",
          colorInputBackground: "rgba(255,255,255,0.05)",
          colorInputText: "#f0f0f5",
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <html lang="en">
        <body
          className={`${bricolage.variable} ${inter.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
