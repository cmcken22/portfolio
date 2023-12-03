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

const HoverCard2 = memo(
  ({
    children,
    sx,
    sx2,
    onMouseEnter,
    onMouseLeave,
    disabled,
    hover,
    hoverRef,
    pX = 16,
    pY = 16,
  }) => {
    const [dimensions, setDimensions] = useState({
      height: `calc(100% + ${pY * 2}px)`,
      width: `calc(100% + ${pX * 2}px)`,
    });

    const hoverStyles = useMemo(() => {
      return {
        "& > .box-shadow": {
          opacity: "1 !important",
        },
      };
    }, []);

    const calculateDimensions = useCallback(() => {
      if (!hoverRef) return;
      const { width, height } = hoverRef?.getBoundingClientRect();
      setDimensions({
        height: `${height + pY * 2}px`,
        width: `${width + pX * 2}px`,
      });
    }, [hoverRef, setDimensions]);

    useEffect(() => {
      if (!hoverRef) return;
      calculateDimensions();
    }, [hoverRef]);

    useEffect(() => {
      window.addEventListener("resize", calculateDimensions);
      return () => {
        window.removeEventListener("resize", calculateDimensions);
      };
    }, [hoverRef, calculateDimensions]);

    return (
      <Box
        className="hover-card"
        sx={{
          position: "relative",
          ...(!disabled && hover && hoverStyles),
          ...(!disabled && {
            "&:hover": hoverStyles,
          }),
          ...sx,
        }}
        onMouseEnter={(e) => {
          if (onMouseEnter) onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          if (onMouseLeave) onMouseLeave(e);
        }}
      >
        <CardWrapper
          className="box-shadow"
          style={{
            opacity: 0,
            pointerEvents: "none",
            borderRadius: "0.375rem",
            transitionProperty:
              "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "300ms",
            zIndex: 0,
            // height: "calc(100% + 32px)",
            // width: "calc(100% + 32px)",
            ...dimensions,
            position: "absolute",
            top: `-${pY}px`,
            left: `-${pX}px`,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
            ...sx2,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

export default forwardRef(HoverCard);
