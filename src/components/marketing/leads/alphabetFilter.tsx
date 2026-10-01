"use client";

import React from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetFilterProps {
  value: string;
  onChange: (letter: string) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({ value, onChange }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-50/80 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/40">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-gray-500">Filter by company name</p>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-brand-500 hover:underline"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-1" role="toolbar" aria-label="Filter leads by company name">
        <LetterButton active={value === ""} onClick={() => onChange("")} wide>
          All
        </LetterButton>
        <span className="mx-1 hidden h-4 w-px bg-gray-200 sm:block dark:bg-gray-700" aria-hidden />
        {LETTERS.map((letter) => (
          <LetterButton
            key={letter}
            active={value === letter}
            onClick={() => onChange(value === letter ? "" : letter)}
          >
            {letter}
          </LetterButton>
        ))}
        <LetterButton active={value === "#"} onClick={() => onChange(value === "#" ? "" : "#")}>
          #
        </LetterButton>
      </div>
    </div>
  );
};

function LetterButton({
  active,
  onClick,
  wide = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-7 items-center justify-center rounded-md text-xs font-semibold transition ${
        wide ? "min-w-10 px-2.5" : "w-7"
      } ${
        active
          ? "bg-brand-500 text-white shadow-sm"
          : "text-gray-600 hover:bg-white hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function letterEmptyMessage(letter: string, fallback: string) {
  if (!letter) return fallback;
  if (letter === "#") return "No leads for companies starting with a number or symbol";
  return `No leads for companies starting with “${letter}”`;
}

export default AlphabetFilter;
