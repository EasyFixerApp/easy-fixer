"use client";

import { supabase } from "@/lib/supabase/client";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert("Google login failed:" + error.message);
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-600 text-white p-2 rounded mt-4"
    >
      Continue with Google
    </button>
  );
}
