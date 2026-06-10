"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  restoreSessionFromUrl,
  updatePassword,
} from "@/lib/supabase/authServices";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      restoreSessionFromUrl(access_token, refresh_token).catch((err) =>
        setMessage("Failed to restore session: " + err.message),
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePassword(newPassword);
      setMessage("Password changed successfully! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save New Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
      </div>
    </main>
  );
}
