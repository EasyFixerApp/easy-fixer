"use client";
import { useState } from "react";
import { signInWithEmail } from "@/lib/supabase/authServices";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signInWithEmail(email, password);
      return data;
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

  return { login, loading, error };
};
