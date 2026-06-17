"use client";

import React, { useMemo } from "react";
import { State, City, IState, ICity } from "country-state-city";

const COUNTRY_CODE = "IN";

export const indianStates: IState[] = State.getStatesOfCountry(COUNTRY_CODE);

export function getCitiesForState(stateName: string): ICity[] {
  const state = indianStates.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  if (!state) return [];
  return City.getCitiesOfState(COUNTRY_CODE, state.isoCode);
}

interface StateCityPickerProps {
  state: string;
  city: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
}

const selectClass =
  "flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const StateCityPicker: React.FC<StateCityPickerProps> = ({
  state,
  city,
  onStateChange,
  onCityChange,
}) => {
  const cities = useMemo(() => getCitiesForState(state), [state]);

  return (
    <>
      <select
        value={state}
        onChange={(e) => {
          onStateChange(e.target.value);
          onCityChange("");
        }}
        className={selectClass}
      >
        <option value="">Select State</option>
        {indianStates.map((s) => (
          <option key={s.isoCode} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>
      <select
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        disabled={!state}
        className={`${selectClass} disabled:opacity-50`}
      >
        <option value="">
          {state ? "Select City" : "Select state first"}
        </option>
        {cities.map((c) => (
          <option key={`${c.stateCode}-${c.name}`} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default StateCityPicker;
