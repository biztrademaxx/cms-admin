"use client";

import Image from "next/image";
import salesLogo from "@/../public/images/logo/maxxxx-01.png";

type SalesBrandLogoProps = {
  className?: string;
  priority?: boolean;
};

/** MAXX wordmark — static import so Next.js always resolves the asset. */
const SalesBrandLogo = ({
  className = "h-16 w-auto object-contain",
  priority = false,
}: SalesBrandLogoProps) => {
  return (
    <Image
      src={salesLogo}
      alt="MAXX logo"
      width={salesLogo.width || 120}
      height={salesLogo.height || 40}
      className={className}
      priority={priority}
      unoptimized
    />
  );
};

export default SalesBrandLogo;
