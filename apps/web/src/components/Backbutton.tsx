"use client";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute left-1/2 transform -translate-x-1/2 w-[286px] h-[52px]  mt-[80px] block text-center bg-[#c2ddf3] text-[#333] font-semibold rounded-[15px] shadow-md hover:bg-[#a8c9e4] transition-colors"
    >
      BACK
    </button>
  );
}
