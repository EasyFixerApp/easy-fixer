"use client";
import { useState } from "react";
import Link from "next/link";
import { useRegister } from "./useRegister";
import GoogleLoginButton from "../login/GoogleLoginButton";
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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">EasyFix</h1>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Create a new account
        </h3>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
              className="h-4 w-4 text-[#1a8cff] focus:ring-[#1a8cff]"
            />
            <span className="text-gray-700">Client</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={role === "provider"}
              onChange={() => setRole("provider")}
              className="h-4 w-4 text-[#1a8cff] focus:ring-[#1a8cff]"
            />
            <span className="text-gray-700">Service Provider</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a8cff] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a8cff] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a8cff] focus:border-transparent"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a8cff] hover:bg-[#0073e6] text-white p-3 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#1a8cff] hover:underline font-medium"
          >
            Login
          </Link>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <GoogleLoginButton role={role} />
      </div>
    </>
  );
}
