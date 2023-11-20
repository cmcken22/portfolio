import { Box } from "@mui/material";

const StickySectionHeader = ({ children, sx }) => {
  return (
    <Box
      sx={{
        height: "60px",
        width: "100vw",
        position: "sticky",
        top: "0",
        marginLeft: "-48px",
        paddingLeft: "48px",
        zIndex: 5000,
        backdropFilter: "blur(8px)",
        // backgroundColor: "rgba(15, 23, 42, 0.75)",
        // borderBottomColor: "rgb(229, 231, 235)",
        alignItems: "center",
        marginBottom: "1rem",
        display: {
          xs: "flex",
          md: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default StickySectionHeader;
