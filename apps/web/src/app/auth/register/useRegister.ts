"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    setLoading(false);

    if (supabaseError) {
      setError(supabaseError.message);
      return null;
    }

    return data;
  };

  return { register, loading, error };
};
