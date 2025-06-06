"use client";
import { useState } from "react";
import { useLogin } from "./useLogin";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLoginButton";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      alert("Logged in successfully!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Logging in .." : "Login"}
      </button>
      <div className="text-center mt-2">
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 hover:underline text-sm"
        >
          Forgot your password?
        </Link>
      </div>

      <hr className="my-4" />
      <GoogleLoginButton />
    </form>
  );
}
