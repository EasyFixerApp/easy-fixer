"use client";
import { useState } from "react";
import { useLogin } from "./useLogin";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLoginButton";
import AuthRedirect from "@/components/AuthRedirect";
import Logo from "../../../components/logo";
import Back from "../../../components/Backbutton";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      setLoginSuccess(true);
    }
  };

  return (
    <>
      <Logo />

      <div className="bg-[#cce6ff] rounded-xl w-[429px] mx-auto my-10 p-8 shadow-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {loginSuccess && <AuthRedirect />}

          <h3 className="text-center text-2xl font-bold mb-5 text-black">
            Login to your account
          </h3>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
          />

          {error && (
            <p className="text-red-600 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-base font-semibold shadow-md transition"
          >
            {loading ? "Logging in ..." : "Login"}
          </button>

          <div className="text-center mt-2 text-sm text-gray-700">
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 font-medium hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center my-6 text-gray-600 text-sm">
            <div className="flex-grow h-[1px] bg-gray-300"></div>
            <span className="mx-3">or</span>
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>

          <GoogleLoginButton />
        </form>
        <Back />
      </div>
    </>
  );
}
