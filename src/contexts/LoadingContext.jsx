import { create } from "zustand";

export const loadingContext = create((set) => ({
  loading: true,
  progress: 0,
  setLoading: (value) => set(() => ({ loading: value })),
  incrementProgress: (incrementor = 1) =>
    set((state) => {
      const nextProgress = state.progress + incrementor;
      console.log("__nextProgress:", nextProgress);
      return {
        ...state,
        loading: nextProgress >= 100 ? false : state.loading,
        progress: nextProgress,
      };
    }),
}));

const useLoadingContext = () => {
  const state = loadingContext((state) => state);
  return state;
};

export default useLoadingContext;
