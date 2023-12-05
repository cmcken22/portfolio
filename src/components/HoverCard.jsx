import { Box } from "@mui/material";
import { motion } from "framer-motion";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { styled as muiStyled } from "@mui/material";

const StyledBox = muiStyled(motion.div)(({ hover, disabled, sx }) => ({
  borderRadius: "0.375rem",
  transitionProperty:
    "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "300ms",
  zIndex: 0,
  position: "relative",
  minHeight: "100px",
  opacity: 1,
  ...(!disabled && {
    "&:hover": {
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(30, 41, 59, 0.5)",
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
    },
  }),
  ...(!disabled &&
    hover && {
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(30, 41, 59, 0.5)",
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
    }),
}));

const HoverCard = (
  { children, disabled, hover, px = 16, py = 16, sx, ...rest },
  ref
) => {
  return (
    <StyledBox
      ref={ref}
      className="hover-card"
      disabled={disabled}
      hover={hover}
      sx={{
        height: `calc(100% + ${py * 2}px)`,
        width: `calc(100% + ${px * 2}px)`,
        top: `-${py}px`,
        left: `-${px}px`,
        px: `${px}px`,
        py: `${py}px`,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </StyledBox>
  );
};

export default forwardRef(HoverCard);
