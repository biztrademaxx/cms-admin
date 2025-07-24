import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Trash,
  Pencil,
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
}: {
  project: any;
  Icon: React.ComponentType<{ className?: string }>;
  onClick: (id: string, name: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [showDeleteModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setShowDropdown(false);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl border bg-white p-5 hover:border-brand-500 hover:dark:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 relative"
      onClick={(e) => {
        e.stopPropagation();
        onClick(project.id, project.name);
      }}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Icon className="text-gray-800 size-6 dark:text-white/90" />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <h4 className="font-bold text-title-sm text-gray-800 dark:text-white/90">
            {project.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.description || "No description"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="relative">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Select Year
            </label>
            {/* 
            <div className="flex items-center gap-2 text-gray-700 dark:text-white">
              <ChevronLeft
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = YEAR_OPTIONS.findIndex(
                    (y) => y.value === selectedYear
                  );
                  if (idx > 0) setSelectedYear(YEAR_OPTIONS[idx - 1].value);
                }}
                className="hover:text-brand-500"
              />
              <span>{selectedYear}</span>
              <ChevronRight
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = YEAR_OPTIONS.findIndex(
                    (y) => y.value === selectedYear
                  );
                  if (idx < YEAR_OPTIONS.length - 1)
                    setSelectedYear(YEAR_OPTIONS[idx + 1].value);
                }}
                className="hover:text-brand-500"
              />
            </div> */}

            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="appearance-none bg-none focus:outline-none p-2 pr-8 leading-tight text-gray-700 dark:text-gray-400"
            >
              {YEAR_OPTIONS.map((year) => (
                <option
                  key={year.value}
                  value={year.value}
                  className="text-gray-700 dark:bg-gray-900 rounded-2xl dark:text-gray-400"
                >
                  {year.value}
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

          <Pencil
            size={16}
            className="text-black dark:text-white hover:text-brand-500"
            onClick={(e) => {
              setShowEditModal(true);
              e.stopPropagation();
            }}
          />
        </div>
      </div>
      <WarningModal
        isOpen={showDeleteModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={() => router.push(`/projects/add?p=${project.id}`)}
        title="Edit Project"
        message="Are you sure you want to edit this project?"
        confirmText="Edit"
      />
    </div>
  );
};

export default ProjectCard;
