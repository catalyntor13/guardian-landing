"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/app/actions/subscribe";
import { validateEmail } from "@/lib/utils";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Loader2Icon } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setError(null);

    if (!validateEmail(email)) {
      const errorMsg = "Please enter a valid email address";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        const errorMsg = result.error || "An error occurred";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubscribe();
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center space-y-8">
          {/* Hero Image */}
          <div className="flex justify-center">
            <Image
              src="/guardian.png"
              alt="Guardian Logo"
              width={320}
              height={240}
              className="w-auto h-auto drop-shadow-xl"
              priority
            />
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-fjalla-one">
              Get your Free Scam Proof Checklist

              </h1>
              <p className="text-xl md:text-2xl text-cyan-300 font-semibold">
                10 Things Scammers Hope You Never Do
              </p>
            </div>

            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <p className="text-lg text-slate-300 leading-relaxed">
                Your complete guide to protecting your money and identity. Get it instantly in your inbox.
              </p>

              {/* Checklist Items */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-cyan-400 text-xl font-bold flex-shrink-0">✓</span>
                  <p className="text-slate-200">10 concrete steps to protect your money and identity — starting today</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-cyan-400 text-xl font-bold flex-shrink-0">✓</span>
                  <p className="text-slate-200">The tools professionals use to stay safe online — most are free</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-cyan-400 text-xl font-bold flex-shrink-0">✓</span>
                  <p className="text-slate-200">Why scammers target you specifically — and how to disappear from their radar</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-cyan-400 text-xl font-bold flex-shrink-0">✓</span>
                  <p className="text-slate-200">One simple habit that has protected more people than any antivirus software</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Subscription Form */}
          <div className="space-y-4 pt-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="px-6 py-4 w-full sm:w-auto flex-1 rounded-lg bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              /> 
              <Button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="px-8 py-4 h-auto w-full sm:w-auto cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-base"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Get Free Access"
                )}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm font-medium">{error}</p>
            )}

            <p className="text-xs text-slate-400 text-center">
              ✓ No spam. Unsubscribe anytime.
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-12 border-t border-slate-700">
            <Link
              href="https://x.com/TheScamGuardian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.facebook.com/TheScamGuardian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.instagram.com/thescamguardian/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.youtube.com/@TheScamGuardian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}