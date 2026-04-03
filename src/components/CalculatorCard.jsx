import { useStore } from "../store/useStore";

export default function CalculatorCard({
  calc,
  onClick,
  isActive = false,
  variant = "sidebar", // "sidebar" | "grid"
}) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(calc.id);

  // 🎨 Dynamic styles
  const baseStyle =
    "transition-all duration-200 cursor-pointer group";

  const sidebarStyle = `
    flex items-center gap-3 p-3 rounded-xl
    ${isActive
      ? "bg-blue-500 text-white shadow"
      : "hover:bg-gray-100 dark:hover:bg-white/10"}
  `;

  const gridStyle = `
    relative p-4 rounded-2xl bg-gradient-to-br from-white to-gray-100
    shadow-md hover:shadow-xl hover:scale-105
  `;

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${
        variant === "sidebar" ? sidebarStyle : gridStyle
      }`}
    >
      {/* ⭐ Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(calc.id);
        }}
        className={`${
          variant === "sidebar"
            ? "text-sm"
            : "absolute top-2 right-2 text-lg"
        }`}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      {/* 🧩 Sidebar Layout */}
      {variant === "sidebar" ? (
        <>
          {/* Icon */}
          <div className="text-xl">{calc.icon || "🧮"}</div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {calc.title}
            </p>

            <p
              className={`text-xs ${
                isActive
                  ? "text-blue-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {calc.category}
            </p>
          </div>
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