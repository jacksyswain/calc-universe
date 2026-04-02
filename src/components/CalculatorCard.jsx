import { useStore } from "../store/useStore";

export default function CalculatorCard({ calc, onClick }) {
  const { favorites, toggleFavorite } = useStore();

  const isFav = favorites.includes(calc.id);

  return (
    <div
      onClick={onClick}
      className="relative p-4 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
    >
      {/* ⭐ Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(calc.id);
        }}
        className="absolute top-2 right-2 text-xl"
      >
        {isFav ? "⭐" : "☆"}
      </button>

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

      {/* 🔥 Bottom Indicator */}
      <div className="mt-4 text-center text-blue-500 text-sm font-medium">
        Tap to open →
      </div>
    </div>
  );
}