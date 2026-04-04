import { useStore } from "../store/useStore";

export default function CalculatorCard({
  calc,
  onClick,
  isActive = false,
  variant = "sidebar",
  collapsed = false, // 🔥 for future sidebar collapse
}) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(calc.id);

  const base =
    "transition-all duration-200 cursor-pointer group relative";

  const sidebarStyle = `
    flex items-center gap-3 px-3 py-2 rounded-xl
    ${
      isActive
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500"
        : "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
    }
  `;

  const gridStyle = `
    relative p-4 rounded-2xl bg-gradient-to-br from-white to-gray-100
    shadow-md hover:shadow-xl hover:scale-105
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
              ? "text-xs opacity-0 group-hover:opacity-100"
              : "absolute top-2 right-2 text-lg"
          }
          transition
        `}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      {/* 🧩 SIDEBAR MODE */}
      {variant === "sidebar" ? (
        <>
          {/* Icon */}
          <div className="text-lg">{calc.icon || "🧮"}</div>

          {/* Text (hide when collapsed) */}
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {calc.title}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {calc.category}
              </p>
            </div>
          )}

          {/* Tooltip (when collapsed) */}
          {collapsed && (
            <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
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
          <div className="mt-4 text-center text-blue-500 text-sm font-medium">
            Open →
          </div>
        </>
      )}
    </div>
  );
}