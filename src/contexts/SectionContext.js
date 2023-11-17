import { Sections } from "constants";
import { create } from "zustand";

const sectionContext = create((set) => ({
  activeSection: Sections.Hero,
  setActiveSection: (sectionName) =>
    set(() => ({ activeSection: sectionName })),
}));

const usSectionContext = () => {
  const state = sectionContext((state) => state);
  return state;
};

export default usSectionContext;
