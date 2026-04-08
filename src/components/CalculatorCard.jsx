import { useStore } from "../store/useStore";

export default function CalculatorCard({
  calc,
  onClick,
  isActive = false,
  variant = "sidebar",
  collapsed = false,
}) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(calc.id);

  const base =
    "relative flex items-center transition-all duration-200 cursor-pointer group select-none";

  const sidebarStyle = `
    gap-3 px-3 py-2 rounded-xl
    ${
      isActive
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-200 dark:ring-blue-800"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
    }
  `;

  const gridStyle = `
    relative p-4 rounded-2xl bg-gradient-to-br from-white to-gray-100
    shadow-md hover:shadow-xl hover:scale-[1.03]
  `;

  return (
    <div
      onClick={onClick}
      className={`${base} ${
        variant === "sidebar" ? sidebarStyle : gridStyle
      }`}
    >
      {/* ⭐ Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(calc.id);
        }}
        className={`
          ${
            variant === "sidebar"
              ? "absolute right-2 text-xs opacity-0 group-hover:opacity-100"
              : "absolute top-2 right-2 text-lg"
          }
          transition-all duration-200 hover:scale-110
        `}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      {/* 🧩 SIDEBAR MODE */}
      {variant === "sidebar" ? (
        <>
          {/* Icon Container */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg 
            ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-white/10"
            }`}
          >
            {calc.icon || "🧮"}
          </div>

          {/* Text */}
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {calc.title}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {calc.category}
              </p>
            </div>
          )}

          {/* 👉 Active Indicator */}
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
          )}

          {/* Tooltip (collapsed mode) */}
          {collapsed && (
            <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg z-50">
              {calc.title}
            </div>
          )}
        </>
      ) : (
        <>
          {/* 📂 Category */}
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {calc.category || "General"}
          </span>

          {/* 🧠 Title */}
          <h2 className="text-lg font-semibold text-center mt-4">
            {calc.title}
          </h2>

          {/* 📐 Formula */}
          {calc.formulaLabel && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              {calc.formulaLabel}
            </p>
          )}

          {/* 🔥 CTA */}
          <div className="mt-4 text-center text-blue-500 text-sm font-medium group-hover:translate-x-1 transition">
            Open →
          </div>
        </>
      )}
    </div>
  );
}