import { Typography, useTheme } from "@mui/material";
import { forwardRef } from "react";

const UnderlinedText = ({ children, underlined, sx, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Typography
      ref={ref}
      color="primary.main"
      width="100%"
      sx={{
        width: "fit-content !important",
        cursor: "pointer",
        transition: "all ease-in-out 0.3s !important",
        "&:hover": {
          textDecoration: "underline",
          textDecorationColor: theme.palette.secondary.main,
          textUnderlineOffset: "0.25rem",
        },
        ...(underlined && {
          textDecoration: "underline",
          textDecorationColor: theme.palette.secondary.main,
          textUnderlineOffset: "0.25rem",
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default forwardRef(UnderlinedText);
