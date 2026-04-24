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
    "relative flex items-center transition-all duration-200 cursor-pointer group select-none focus:outline-none";

  const sidebarStyle = `
    gap-3 px-3 py-2 rounded-xl
    ${
      isActive
        ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-200 dark:ring-blue-800"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
    }
  `;

  const gridStyle = `
    relative p-4 rounded-2xl bg-gradient-to-br from-white to-gray-100
    shadow-md hover:shadow-xl hover:scale-[1.04]
  `;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
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
          transition-all duration-200 hover:scale-125 active:scale-95
        `}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      {/* 🧩 SIDEBAR MODE */}
      {variant === "sidebar" ? (
        <>
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all
            ${
              isActive
                ? "bg-blue-500 text-white shadow-md scale-105"
                : "bg-gray-100 dark:bg-white/10 group-hover:scale-105"
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

          {/* 👉 Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full" />
          )}

          {/* Tooltip */}
          {collapsed && (
            <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl z-50">
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
          <div className="mt-4 text-center text-blue-500 text-sm font-medium flex justify-center items-center gap-1 group-hover:gap-2 transition-all">
            Open →
          </div>
        </>
      )}

      {/* 🟢 Click Ripple Effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-10 bg-blue-500 transition" />
    </div>
  );
}