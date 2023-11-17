import { create } from "zustand";

export const loadingContext = create((set) => ({
  loading: true,
  progress: 0,
  setLoading: (value) => set(() => ({ loading: value })),
  setProgress: (value) => set(() => ({ progress: value })),
  incrementProgress: (incrementor = 1) =>
    set((state) => {
      const nextProgress = state.progress + incrementor;
      return {
        ...state,
        loading: nextProgress >= 100 ? false : state.loading,
        progress: nextProgress >= 100 ? 100 : nextProgress,
      };
    }),
}));

const useLoadingContext = () => {
  const state = loadingContext((state) => state);
  return state;
};

export default useLoadingContext;
