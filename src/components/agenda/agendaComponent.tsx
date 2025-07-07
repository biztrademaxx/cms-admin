"use client"

import React, { useState } from 'react'
import Button from '../ui/button/Button';
import AgendaTable from '../tables/agendaTable';

const agendaDays = [
  { label: "Day 1", date: "2025-10-23" },
  { label: "Day 2", date: "2025-10-24" },
  { label: "Day 3", date: "2025-10-25" },
];

const AgendaComponent = () => {
     const [selectedDate, setSelectedDate] = useState<string>(agendaDays[0].date);

const uniqueDates = Array.from(new Set(agendaDays.map(item => item.date))).sort();

  return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Agenda Management
          </h3>
         <div className="flex gap-3 mb-6">
  {uniqueDates.map((date, idx) => (
  <Button
    key={date}
    variant={selectedDate === date ? "primary" : "outline"}
    onClick={() => setSelectedDate(date)}
  >
    {`Day ${idx + 1}`} ({date})
  </Button>
))}
</div>

        </div>
        <AgendaTable selectedDate={selectedDate} />
      </div>
  )
}

export default AgendaComponent