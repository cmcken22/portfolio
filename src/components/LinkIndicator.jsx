import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

const LinkIndicator = ({ children, sx, arrowType, componentRef, ...rest }) => {
  const [active, setActive] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const handleMouseLeave = useCallback(() => {
    setActive(false);
  }, [setActive]);

  useEffect(() => {
    const enterEvents = ["mouseenter", "touchenter", "touchstart"];
    const leaveEvents = ["mouseleave", "touchleave", "touchend"];
    if (componentRef) {
      for (let event of enterEvents) {
        componentRef.addEventListener(event, handleMouseEnter);
      }
      for (let event of leaveEvents) {
        componentRef.addEventListener(event, handleMouseLeave);
      }
    }
    return () => {
      if (componentRef) {
        for (let event of enterEvents) {
          componentRef.removeEventListener(event, handleMouseLeave);
        }
        for (let event of leaveEvents) {
          componentRef.removeEventListener(event, handleMouseLeave);
        }
      }
    };
  }, [handleMouseEnter, handleMouseLeave, componentRef]);

  const dormantStyles = useMemo(() => {
    if (arrowType === "straight") {
      return {
        left: "-2px",
      };
    }
    return {
      bottom: "-2px",
      left: "-2px",
    };
  }, [arrowType]);

  const hoverStyles = useMemo(() => {
    if (arrowType === "straight") {
      return {
        "& .out-icon": {
          left: "2px !important",
          color: "rgb(94, 234, 212) !important",
        },
      };
    }
    return {
      "& .out-icon": {
        bottom: "2px !important",
        left: "2px !important",
        color: "rgb(94, 234, 212) !important",
      },
    };
  }, [arrowType]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          ...hoverStyles,
        },
        ...(active ? hoverStyles : {}),
        ...sx,
      }}
      {...rest}
    >
      {children}
      <Box
        sx={{
          ml: 0.5,
          position: "relative",
          display: "flex",
          height: "20px",
          width: "20px",
          "& svg": {
            transition: "all ease-in-out 0.3s !important",
            height: "100%",
            width: "100%",
            transform: "scale(0.8)",
            position: "absolute",
            ...dormantStyles,
          },
        }}
      >
        {arrowType === "straight" ? (
          <ArrowForwardIcon className="out-icon" />
        ) : (
          <ArrowOutwardIcon className="out-icon" />
        )}
      </Box>
    </Box>
  );
};

LinkIndicator.defaultProps = {
  arrowType: "straight",
};

export default LinkIndicator;
