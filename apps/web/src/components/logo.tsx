"use client";

import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  showText?: boolean;
};

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="absolute top-0 left-0 w-[317px] h-[78px] flex items-center text-[#0889C3] font-aclonica text-[32px] font-extrabold"
    >
      <Image
        src="/logo.png"
        alt="EasyFix Logo"
        width={90}
        height={90}
        className="w-[90px] h-[90px]"
        priority
      />
      {showText && <span className="ml-2">EasyFix</span>}
    </Link>
  );
}
