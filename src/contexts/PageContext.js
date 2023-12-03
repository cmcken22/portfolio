import { Pages } from "@constants";
import { create } from "zustand";

const pageContext = create((set) => ({
  activePage: Pages.Hero,
  setActivePage: (sectionName) => set(() => ({ activePage: sectionName })),
}));

const usepageContext = () => {
  const state = pageContext((state) => state);
  return state;
};

export default usepageContext;
