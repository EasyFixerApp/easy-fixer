"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserRole() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      const role = user.user_metadata?.role;

      if (!role) {
        router.push("/login");
        return;
      }

      if (role === "client") {
        router.push("/dashboard/client");
      } else if (role === "provider") {
        router.push("/dashboard/provider");
      } else {
        router.push("/login");
      }
    }

    checkUserRole().finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return null;
}
