"use client";
import { useState } from "react";
import Link from "next/link";
import { useRegister } from "./useRegister";
import GoogleLoginButton from "../login/GoogleLoginButton";

import Logo from "../../../components/logo";
import Back from "../../../components/Backbutton";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<"client" | "provider">("client");
  const { register, loading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }
    const result = await register(email, password, role);
    if (result && !error) {
      alert("Check your email for confirmation!");
    }
  };

  return (
    <>
      <Logo />

      <div className="bg-[#cce6ff] rounded-xl w-[429px] h-[544px] mx-auto my-20 mt-0 p-8 shadow-md">
        <h3 className="text-center text-2xl font-bold mb-5 text-black">
          Create a new account
        </h3>

        <div className="flex items-center gap-3 mb-5 text-sm text-[#222] font-medium w-[100%] justify-between">
          I am a
          <label className="flex items-center gap-1 font-semibold cursor-pointer">
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
              className="cursor-pointer"
            />
            <span>Client</span>
          </label>
          <label className="flex items-center gap-1 font-semibold cursor-pointer">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={role === "provider"}
              onChange={() => setRole("provider")}
              className="cursor-pointer"
            />
            <span>Service Provider</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>

        <div className="flex items-center my-6 text-gray-600 text-sm">
          <div className="flex-grow h-[1px] bg-gray-300"></div>
          <span className="mx-3">or</span>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>

        <GoogleLoginButton role={role} />
        <Back />
      </div>
    </>
  );
}
