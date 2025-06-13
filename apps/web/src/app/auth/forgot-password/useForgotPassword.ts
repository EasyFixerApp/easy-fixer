"use client";
import { useState } from "react";
import { sendPasswordResetLink } from "@/lib/supabase/authServices";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendResetLink = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetLink(email);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetLink, loading, error, success };
};
