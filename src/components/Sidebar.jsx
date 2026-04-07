import { useState } from "react";
import CalculatorCard from "./CalculatorCard";
import { useStore } from "../store/useStore";

export default function Sidebar({
  calculators,
  active,
  setActive,
}) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const { favorites } = useStore();

  // 🔍 Search filter (title + category)
  const filtered = calculators.filter((calc) =>
    (calc.title + calc.category)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ⭐ Favorites
  const favoriteCalcs = filtered.filter((c) =>
    favorites.includes(c.id)
  );

  // 📂 Group by category
  const grouped = filtered.reduce((acc, calc) => {
    if (!acc[calc.category]) acc[calc.category] = [];
    acc[calc.category].push(calc);
    return acc;
  }, {});

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } h-screen bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-white/10 p-4 flex flex-col transition-all`}
    >
      {/* 🔷 Header */}
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            🧮 SmartCalc
          </h1>
        )}

        {/* 📌 Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-white/10"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* 🔍 Search */}
      {!collapsed && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* 📂 Content */}
      <div className="flex-1 overflow-y-auto space-y-4">

        {/* ⭐ Favorites */}
        {favoriteCalcs.length > 0 && (
          <div>
            {!collapsed && (
              <p className="text-xs text-gray-400 mb-2">
                Favorites
              </p>
            )}

            <div className="space-y-1">
              {favoriteCalcs.map((calc) => (
                <CalculatorCard
                  key={calc.id}
                  calc={calc}
                  variant="sidebar"
                  collapsed={collapsed}
                  isActive={active?.id === calc.id}
                  onClick={() => setActive(calc)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 📂 Categories */}
        {Object.keys(grouped).map((category) => (
          <div key={category}>
            {!collapsed && (
              <p className="text-xs text-gray-400 mb-2">
                {category}
              </p>
            )}

            <div className="space-y-1">
              {grouped[category].map((calc) => (
                <CalculatorCard
                  key={calc.id}
                  calc={calc}
                  variant="sidebar"
                  collapsed={collapsed}
                  isActive={active?.id === calc.id}
                  onClick={() => setActive(calc)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* ❌ Empty */}
        {filtered.length === 0 && !collapsed && (
          <p className="text-sm text-gray-400 text-center mt-4">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}