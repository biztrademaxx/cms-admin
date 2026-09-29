"use client";

import Image from "next/image";
import brandLogo from "@/../public/images/logo/maxxxx-01.png";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

/** Single MAXX wordmark for light and dark mode (no theme swap). */
const BrandLogo = ({
  className = "h-16 w-auto object-contain",
  priority = false,
}: BrandLogoProps) => {
  return (
    <Image
      src={brandLogo}
      alt="MAXX logo"
      width={brandLogo.width || 160}
      height={brandLogo.height || 48}
      className={className}
      priority={priority}
      unoptimized
    />
  );
};

export default BrandLogo;
