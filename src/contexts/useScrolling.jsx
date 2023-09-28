import { create } from "zustand";

const useScrolling = create((set) => ({
  scrolling: false,
  setScrolling: (value) => set((state) => ({ scrolling: value })),
}));

export default useScrolling;
