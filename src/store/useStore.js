import { create } from "zustand";

// 🧠 Load from localStorage
const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export const useStore = create((set, get) => ({
  // 📊 GLOBAL STATE
  history: load("history", []),
  favorites: load("favorites", []),
  calculatorStates: load("calcStates", {}),

  // =========================
  // 🕒 HISTORY
  // =========================
  addHistory: (item) => {
    const updated = [item, ...get().history].slice(0, 50); // limit to 50

    localStorage.setItem("history", JSON.stringify(updated));
    set({ history: updated });
  },

  clearHistory: () => {
    localStorage.removeItem("history");
    set({ history: [] });
  },

  // =========================
  // ⭐ FAVORITES
  // =========================
  toggleFavorite: (id) => {
    const current = get().favorites;

    const updated = current.includes(id)
      ? current.filter((f) => f !== id)
      : [...current, id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  // =========================
  // 🧠 CALCULATOR STATE (KEY FEATURE)
  // =========================
  setCalculatorState: (id, data) => {
    const updated = {
      ...get().calculatorStates,
      [id]: data,
    };

    localStorage.setItem("calcStates", JSON.stringify(updated));
    set({ calculatorStates: updated });
  },

  clearCalculatorState: (id) => {
    const updated = { ...get().calculatorStates };
    delete updated[id];

    localStorage.setItem("calcStates", JSON.stringify(updated));
    set({ calculatorStates: updated });
  },

  clearAllCalculatorStates: () => {
    localStorage.removeItem("calcStates");
    set({ calculatorStates: {} });
  },
}));