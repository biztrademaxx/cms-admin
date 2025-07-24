import React from "react";

const UtmMetrics = ({ data }: any) => {
  return (
    <>
      {data.map((metric: any, index: number) => (
        <div
          key={index}
          className={`rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ${
            metric.selected
              ? "border-brand-500 dark:text-brand-400"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <metric.icon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="mt-5">
            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metric.value}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metric.title}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default UtmMetrics;
