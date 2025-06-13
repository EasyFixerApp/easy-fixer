"use client";
import { signInWithGoogle } from "@/lib/supabase/authServices";

interface GoogleLoginButtonProps {
  role?: "client" | "provider";
}

export default function GoogleLoginButton({ role }: GoogleLoginButtonProps) {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(role);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to initiate Google sign-in");
      }
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-md transition duration-200"
    >
      Continue with Google
    </button>
  );
}
