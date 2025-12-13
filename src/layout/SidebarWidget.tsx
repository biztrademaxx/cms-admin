import Link from "next/link";
import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Business CMS
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Business CMS is a powerful content management system designed to help you
        manage your projects and content efficiently. With Business CMS, you can
        easily create, manage, and publish your projects and content.
      </p>
      <Link
        href="/projects/add"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Add New Project
      </Link>
    </div>
  );
}
