"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import authLogo from "@/../public/images/logo/auth-logo.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="flex flex-col flex-1 lg:w-1/2 w-full justify-center items-center">
        <div className="w-full max-w-md mx-auto p-6">
          {children}
        </div>
      </div>

      {/* Right side - Logo/Branding */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-brand-950 dark:bg-white/5">
        <Link href="/" className="block">
          <Image 
            width={231} 
            height={48} 
            src={authLogo} 
            alt="Logo" 
            priority 
            className="max-w-full h-auto"
          />
        </Link>
      </div>
    </div>
  );
}