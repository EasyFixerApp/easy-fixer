"use client";
import { signInWithGoogle } from "@/lib/supabase/authServices";
import Image from "next/image";
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
      className="flex items-center justify-center gap-2 w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition text-sm font-semibold"
    >
      <Image
        src="/Googleicon.png"
        alt="Google icon"
        width={16}
        height={16}
        className="mr-2"
      />
      Continue with Google
    </button>
  );
}
