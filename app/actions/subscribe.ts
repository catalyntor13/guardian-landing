"use server"

import { db } from "@/db";
import { emailSubmissions } from "@/db/schema";
import { validateEmail } from "@/lib/utils";

interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResponse> {
  try {
    // Validate email
    if (!validateEmail(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Insert into database
    await db.insert(emailSubmissions).values({
      email: email.toLowerCase(),
    });

    return {
      success: true,
      message: "Thank you for subscribing! Please check your email for the PDF.",
    };
  } catch (error) {
    console.error("Subscribe error:", error);
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes("unique")) {
      return {
        success: false,
        error: "This email is already subscribed",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while subscribing",
    };
  }
}
