import Sound from "react-sound";
import { create } from "zustand";

export const appContext = create((set) => ({
  enter: false,
  setEnter: (value) => set(() => ({ enter: value })),
  music: false,
  musicPlayState: Sound.status.STOPPED,
  allowMusic: (value) => set(() => ({ music: value })),
  playMusic: () =>
    set((state) => {
      if (!state.music) return state;
      return {
        ...state,
        musicPlayState: Sound.status.PLAYING,
      };
    }),
  pauseMusic: () =>
    set((state) => {
      if (!state.music) return state;
      return {
        ...state,
        musicPlayState: Sound.status.PAUSED,
      };
    }),
  stopMusic: () =>
    set((state) => {
      if (!state.music) return state;
      return {
        ...state,
        musicPlayState: Sound.status.STOPPED,
      };
    }),
}));

const useAppContext = () => {
  const state = appContext((state) => state);
  return state;
};

export default useAppContext;
