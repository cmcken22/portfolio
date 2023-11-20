import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

const CardWrapper = styled(motion.div)`
  // border-radius: 20px;
  // backdrop-filter: blur(4px) brightness(120%);
`;

const HoverCard = memo(
  ({
    children,
    sx,
    sx2,
    onMouseEnter,
    onMouseLeave,
    disabled,
    hover,
    hoverRef,
  }) => {
    const [dimensions, setDimensions] = useState({
      height: "calc(100% + 32px)",
      width: "calc(100% + 32px)",
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
        height: `${height + 32}px`,
        width: `${width + 32}px`,
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
            top: "-16px",
            left: "-16px",
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

export default HoverCard;
