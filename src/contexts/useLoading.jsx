import { create } from "zustand";

const useLoading = create((set) => ({
  loadingRefs: {
    About: true,
  },
  setLoading: (section, value) =>
    set((state) => {
      if (state.loadingRefs[section] !== value) {
        state.loadingRefs[section] = value;
        return {
          ...state,
          loadingRefs: {
            ...state.loadingRefs,
            [section]: value,
          },
        };
      }
    }),
}));

export default useLoading;
