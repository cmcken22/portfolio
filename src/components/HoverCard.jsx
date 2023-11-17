import { Box } from "@mui/material";
import { memo } from "react";

const HoverCard = memo(({ children, sx }) => {
  return (
    <Box
      sx={{
        position: "relative",
        "&:hover": {
          "& > .box-shadow": {
            opacity: 1,
          },
        },
        ...sx,
      }}
    >
      <Box
        className="box-shadow"
        sx={{
          opacity: 0,
          borderRadius: "0.375rem",
          transitionProperty:
            "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "300ms",
          zIndex: 0,
          height: "calc(100% + 32px)",
          width: "calc(100% + 32px)",
          position: "absolute",
          top: "-16px",
          left: "-16px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
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
});

export default HoverCard;
