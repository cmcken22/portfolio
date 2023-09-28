import { create } from "zustand";

const useMobile = create((set) => ({
  mobile: false,
  setMobile: (value) => set((state) => ({ mobile: value })),
}));

export default useMobile;
