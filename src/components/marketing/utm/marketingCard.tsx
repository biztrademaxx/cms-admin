import { useState } from "react";
import { useRouter } from "next/navigation";

const MarketingCard = ({ count, name }: { count: number; name: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <div
      className="cursor-pointer rounded-2xl border bg-white p-5 hover:border-brand-500 hover:dark:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="my-3 space-y-3 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
        <h4 className="font-bold text-title-sm text-gray-800 dark:text-white/90 text-center">
          {count || "0"}
        </h4>
      </div>
    </div>
  );
};

export default MarketingCard;
