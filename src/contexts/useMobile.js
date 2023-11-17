import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { create } from "zustand";

const mobileContext = create((set) => ({
  mobile: null,
  size: null,
  setMobile: (value) => set((state) => ({ mobile: value })),
  setSize: (value) => set((state) => ({ size: value })),
}));

const useBreakPoint = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const md = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const lg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  if (xs) return "xs";
  if (sm) return "sm";
  if (md) return "md";
  if (lg) return "lg";
  if (xl) return "xl";
  return "";
};

const useMobile = () => {
  const state = mobileContext((state) => state);
  const breakpoint = useBreakPoint();

  useEffect(() => {
    if (breakpoint === "xs") {
      state.setMobile(true);
    } else {
      state.setMobile(false);
    }
  }, [breakpoint]);

  return state;
};

export default useMobile;
