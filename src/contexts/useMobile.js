import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { create } from "zustand";

const mobileContext = create((set) => ({
  mobile: null,
  size: null,
  small: false,
  setMobile: (value) => set((state) => ({ mobile: value })),
  setSize: (value) => set((state) => ({ size: value })),
  setSmall: (value) => set((state) => ({ small: value })),
}));

export const useBreakPoint = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  if (xs) return "xs";
  if (sm) return "sm";
  if (md) return "md";
  if (lg) return "lg";
  if (xl) return "xl";
  return "";
};

const detectMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
};

const useMobile = () => {
  const state = mobileContext((state) => state);
  const breakpoint = useBreakPoint();

  useEffect(() => {
    const mobileDevice = detectMobile();
    state.setMobile(breakpoint === "xs" || breakpoint === "sm" || mobileDevice);
    state.setSmall(
      breakpoint === "xs" ||
        breakpoint === "sm" ||
        breakpoint === "md" ||
        mobileDevice
    );
  }, [breakpoint]);

  return state;
};

export default useMobile;