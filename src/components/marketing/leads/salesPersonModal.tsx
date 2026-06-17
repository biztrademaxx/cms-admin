"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import StateCityPicker from "./stateCityPicker";
import { Plus, X } from "lucide-react";

interface CityAssignment {
  city: string;
  state: string;
}

interface SalesPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    cities: CityAssignment[];
  }) => void;
  initialValues?: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    cities?: { city: string; state: string }[] | null;
  };
  loading?: boolean;
}

const SalesPersonModal: React.FC<SalesPersonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  loading,
}) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [phone, setPhone] = useState(initialValues?.phone ?? "");
  const [password, setPassword] = useState("");
  const [cities, setCities] = useState<CityAssignment[]>(
    initialValues?.cities?.map((c) => ({ city: c.city, state: c.state })) ?? [
      { city: "", state: "" },
    ]
  );

  React.useEffect(() => {
    if (isOpen) {
      setName(initialValues?.name ?? "");
      setEmail(initialValues?.email ?? "");
      setPhone(initialValues?.phone ?? "");
      setPassword("");
      setCities(
        initialValues?.cities?.map((c) => ({ city: c.city, state: c.state })) ?? [
          { city: "", state: "" },
        ]
      );
    }
  }, [isOpen, initialValues]);

  const addCity = () => setCities([...cities, { city: "", state: "" }]);

  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  const updateCity = (index: number, field: "city" | "state", value: string) => {
    const updated = [...cities];
    updated[index][field] = value;
    setCities(updated);
  };

  const handleSubmit = () => {
    const validCities = cities.filter((c) => c.city.trim() && c.state.trim());
    onSubmit({
      id: initialValues?.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim() || undefined,
      cities: validCities,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          {initialValues ? "Edit Sales Person" : "Add Sales Person"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="Sales person name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {initialValues ? "New Password (leave blank to keep)" : "Password"}
              {!initialValues && <span className="text-error-500"> *</span>}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder={initialValues ? "Enter new password to reset" : "Min 6 characters"}
            />
            <p className="text-xs text-gray-500 mt-1">
              Sales person uses this email and password to log in
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Assigned Cities
              </label>
              <button
                type="button"
                onClick={addCity}
                className="text-xs text-brand-500 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add City
              </button>
            </div>
            <div className="space-y-3">
              {cities.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <StateCityPicker
                    state={c.state}
                    city={c.city}
                    onStateChange={(val) => updateCity(i, "state", val)}
                    onCityChange={(val) => updateCity(i, "city", val)}
                  />
                  {cities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCity(i)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={
              loading ||
              !name.trim() ||
              !email.trim() ||
              (!initialValues && password.trim().length < 6)
            }
          >
            {loading ? "Saving..." : initialValues ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SalesPersonModal;
