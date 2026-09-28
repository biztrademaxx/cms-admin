"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import StateCityPicker from "./stateCityPicker";
import {
  AddExistingSalesPersonToProjectDocument,
  GetSalesPeopleByProjectDocument,
  GetSalesPeopleDocument,
} from "@/gql_generated/graphql";
import { Plus, X } from "lucide-react";

interface CityAssignment {
  city: string;
  state: string;
}

interface AddExistingSalesPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const AddExistingSalesPersonModal: React.FC<AddExistingSalesPersonModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const [sourceId, setSourceId] = useState("");
  const [cities, setCities] = useState<CityAssignment[]>([{ city: "", state: "" }]);

  const { data: allData, loading: loadingAll } = useQuery(GetSalesPeopleDocument, {
    skip: !isOpen,
  });
  const { data: projectData } = useQuery(GetSalesPeopleByProjectDocument, {
    variables: { projectId },
    skip: !isOpen || !projectId,
  });

  const [addExisting, { loading }] = useMutation(
    AddExistingSalesPersonToProjectDocument,
    {
      refetchQueries: [
        { query: GetSalesPeopleByProjectDocument, variables: { projectId } },
      ],
      onCompleted: () => {
        setSourceId("");
        setCities([{ city: "", state: "" }]);
        onClose();
      },
    }
  );

  const availablePeople = useMemo(() => {
    const onProjectEmails = new Set(
      (projectData?.getSalesPeopleByProject ?? []).map((p) => p.email.toLowerCase())
    );
    return (allData?.getSalesPeople ?? []).filter(
      (sp) =>
        sp.projectId !== projectId &&
        !onProjectEmails.has(sp.email.toLowerCase())
    );
  }, [allData, projectData, projectId]);

  const handleSubmit = () => {
    if (!sourceId) return;
    const validCities = cities.filter((c) => c.city.trim() && c.state.trim());
    addExisting({
      variables: {
        input: {
          sourceSalesPersonId: sourceId,
          projectId,
          ...(validCities.length && { cities: validCities }),
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Add Existing Sales Person
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Copy someone from another project into this team. They use the same login;
          at sign-in they choose which project to work in.
        </p>

        {loadingAll ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : availablePeople.length === 0 ? (
          <p className="text-sm text-amber-600">
            No sales people from other projects are available to add.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Sales person
              </label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="">Select person</option>
                {availablePeople.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name} ({sp.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cities for this project (optional)
              </label>
              <div className="space-y-3">
                {cities.map((row, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <StateCityPicker
                        state={row.state}
                        city={row.city}
                        onStateChange={(state) =>
                          setCities((prev) =>
                            prev.map((c, i) => (i === index ? { ...c, state, city: "" } : c))
                          )
                        }
                        onCityChange={(city) =>
                          setCities((prev) =>
                            prev.map((c, i) => (i === index ? { ...c, city } : c))
                          )
                        }
                      />
                    </div>
                    {cities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setCities((prev) => prev.filter((_, i) => i !== index))}
                        className="p-2 mt-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => setCities((prev) => [...prev, { city: "", state: "" }])}
                  startIcon={<Plus className="w-4 h-4" />}
                >
                  Add city
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={loading || !sourceId || availablePeople.length === 0}
          >
            {loading ? "Adding..." : "Add to project"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddExistingSalesPersonModal;
