"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/app/actions/subscribe";
import { validateEmail } from "@/lib/utils";

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
      <div className="w-full max-w-2xl">
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
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-fjalla-one">
              Welcome to Guardian
            </h1>
            <p className="text-xl text-slate-300 max-w-lg mx-auto">
              Your ultimate scam protection solution. Stay safe while browsing the internet.
            </p>
          </div>

          {/* Email Subscription Form */}
          <div className="space-y-4 pt-4">
            <div className="flex  items-center  gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="px-6 py-3   rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:flex-1"
              /> 
              <Button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="px-8 py-3 h-auto  mx-auto cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm animate-pulse">{error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}