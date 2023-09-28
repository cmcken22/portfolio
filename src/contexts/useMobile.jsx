import { create } from "zustand";

const useMobile = create((set) => ({
  mobile: false,
  size: null,
  setMobile: (value) => set((state) => ({ mobile: value })),
  setSize: (value) => set((state) => ({ size: value })),
}));

export default useMobile;
