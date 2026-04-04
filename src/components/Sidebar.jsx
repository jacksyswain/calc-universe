import { useState } from "react";
import CalculatorCard from "./CalculatorCard";

export default function Sidebar({
  calculators,
  active,
  setActive,
}) {
  const [search, setSearch] = useState("");

  // 🔍 filter calculators
  const filtered = calculators.filter((calc) =>
    calc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 h-screen bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-white/10 p-4 flex flex-col">

      {/* 🔷 App Title */}
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        🧮 SmartCalc
      </h1>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search calculator..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📂 List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {filtered.length > 0 ? (
          filtered.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calc={calc}
              variant="sidebar"
              isActive={active?.id === calc.id}
              onClick={() => setActive(calc)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center mt-4">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}