import { create } from "zustand";

export const useStore = create((set) => ({
  isLoggedIn: false,
  setAuthState: () => set((state) => ({ isLoggedIn: state.isLoggedIn })),
}));
