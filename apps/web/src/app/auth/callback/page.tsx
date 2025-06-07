"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        const user = data.session.user;
        if (!user.user_metadata?.role) {
          router.push("/auth/role-selection");
        } else {
          router.push("/");
        }
      } else {
        console.error(error);
        router.push("/auth/login");
      }
    };

    handleOAuth();
  }, [router]);

  return <p>Signing you in with Google ...</p>;
}
