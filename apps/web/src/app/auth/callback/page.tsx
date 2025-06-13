"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";
import * as authServices from "@/lib/supabase/authServices";

export default function OAuthCallback() {
  const router = useRouter();
  const [readyToRedirect, setReadyToRedirect] = useState(false);
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    async function handleCallback() {
      try {
        const user = await authServices.getUser();

        if (!user) {
          router.replace("/auth/login");
          return;
        }

        const userTypeFromLocal = localStorage.getItem("UserRole");

        if (userTypeFromLocal) {
          try {
            await authServices.updateUserRole(userTypeFromLocal);
            localStorage.removeItem("UserRole");
            setHasRole(true);
          } catch {
            alert("Failed to update user role");
            router.replace("/auth/login");
            return;
          }
        } else {
          const role = user.user_metadata?.role;
          if (role) {
            setHasRole(true);
          } else {
            console.warn("User role is missing");
          }
        }

        setReadyToRedirect(true);
      } catch {
        router.replace("/auth/login");
      }
    }

    handleCallback();
  }, [router]);

  if (!readyToRedirect) return <p>Loading...</p>;
  if (hasRole) return <AuthRedirect />;
  return <p>Role not found. Please contact support.</p>;
}
