"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function RoleSelection() {
  const [role, setRole] = useState<"client" | "provider">("client");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      data: { role },
    });

    if (error) {
      alert("Failed to save role: " + error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg mt-10">
      <h1 className="text-xl font-semibold mb-4">Who are you?</h1>
      <form onSubmit={handleSubmit}>
        <label className="flex items-center space-x-2 mb-4 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="client"
            checked={role === "client"}
            onChange={() => setRole("client")}
            className="h-4 w-4 text-blue-600"
          />
          <span>Client</span>
        </label>
        <label className="flex items-center space-x-2 mb-6 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="provider"
            checked={role === "provider"}
            onChange={() => setRole("provider")}
            className="h-4 w-4 text-blue-600"
          />
          <span>Service Provider</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
