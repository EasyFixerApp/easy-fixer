"use client";

import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { User } from "easy-fixer-shared";
import Link from "next/link";

export default function CreateUserPage() {
  const [apiResponse, setApiResponse] = useState<User.Create.Response | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User.Create.Request>({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: api.user.create,
    onSuccess: (data) => {
      setApiResponse(data);
    },
  });

  const onSubmit = (data: User.Create.Request) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Create New User</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isPending ? "Creating..." : "Create User"}
            </button>
          </form>

          {isError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">
                {(error as Error).message || "An error occurred"}
              </p>
            </div>
          )}
        </div>

        {/* API Response Section */}
        {apiResponse && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              API Response
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm overflow-auto whitespace-pre-wrap">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
