"use client";
import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { sendResetLink, loading, error, success } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetLink(email);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4">Forgot your password?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 mt-2">
            A password reset link has been sent to your email.
          </p>
        )}
      </div>
    </main>
  );
}
