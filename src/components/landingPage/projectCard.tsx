import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Trash,
  Pencil,
  Star,
} from "lucide-react";
import { useState } from "react";
import WarningModal from "../modals/warningModal";
import { useRouter } from "next/navigation";

const YEAR_OPTIONS = [
  { value: "2025", label: "2025" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

const ProjectCard = ({
  project,
  Icon,
  onClick,
  years = [],
  idMap = [],
  isBookmarked = false,
  onToggleBookmark = () => {},
}: {
  project: any;
  idMap?: Record<number, string>;
  Icon: React.ComponentType<{ className?: string }>;
  onClick: (year: number, name: string) => void;
  years: number[];
  isBookmarked?: boolean;
  onToggleBookmark?: (projectId: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(years[0] || 2025);
  const [showDeleteModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
    setShowDropdown(false);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl border bg-white p-5 hover:border-brand-500 hover:dark:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 relative"
      onClick={(e) => {
        e.stopPropagation();
        onClick(selectedYear, project.name);
      }}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {project?.logoUrl ? (
          <img
            src={project?.logoUrl}
            alt={project.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <Icon className="text-gray-800 size-6 dark:text-white/90" />
        )}
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <h4 className="font-bold text-title-sm text-gray-800 dark:text-white/90">
            {project.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-h-[lg] truncate">
            {project.description || "No description"}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="relative">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Select Year
            </label>

            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="appearance-none bg-none focus:outline-none p-2 pr-8 leading-tight text-gray-700 dark:text-gray-400"
            >
              {years.map((year, index) => (
                <option
                  key={index}
                  value={year}
                  className="text-gray-700 dark:bg-gray-900 rounded-2xl dark:text-gray-400"
                >
                  {year}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Pencil
              size={16}
              className="text-black dark:text-white hover:text-brand-500"
              onClick={(e) => {
                setShowEditModal(true);
                e.stopPropagation();
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark?.(project.id);
              }}
              className="p-1"
            >
              <Star
                size={18}
                className={`${
                  isBookmarked
                    ? "fill-yellow-400 text-yellow-500"
                    : "text-black"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <WarningModal
        isOpen={showDeleteModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={() => router.push(`/projects/add?p=${idMap[selectedYear]}`)}
        title="Edit Project"
        message="Are you sure you want to edit this project?"
        confirmText="Edit"
      />
    </div>
  );
};

export default ProjectCard;
