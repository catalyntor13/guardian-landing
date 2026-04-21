import type { Metadata } from "next";
import { Geist, Geist_Mono, Fjalla_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Fjalla_One_Font = Fjalla_One({
  variable: "--font-fjalla-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Scam Guardian - Protect Yourself from Online Scams",
  description: "Scam Guardian is your ultimate solution for protecting yourself from online scams. Our advanced AI-powered system detects and blocks fraudulent websites, phishing attempts, and other online threats in real-time. Stay safe while browsing the internet with Scam Guardian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${Fjalla_One_Font.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
       <Toaster />
    </html>
  );
}
