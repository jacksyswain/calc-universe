import { create } from "zustand";

export const useStore = create((set) => ({
  history: [],
  favorites: [],

  addHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history],
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
}));