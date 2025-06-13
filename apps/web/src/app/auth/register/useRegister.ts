"use client";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/supabase/authServices";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signUpWithEmail(email, password, role);
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

  return { register, loading, error };
};
