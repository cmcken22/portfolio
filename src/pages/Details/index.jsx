import { Sections } from "@constants";
import usePageContext from "@contexts/PageContext";
import { Grid, styled } from "@mui/material";
import { useAnimation } from "framer-motion";
import { memo, useEffect } from "react";
import About from "./About";
import Experience from "./Experience";
import Header from "./Header";
import Toolkit from "./Toolkit";

const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "1280px",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },

  // [theme.breakpoints.down("sm")]: {
  //   backgroundColor: "red",
  // },
  // [theme.breakpoints.down("md")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
}));

const Details = memo(() => {
  const inView = usePageContext().activePage === Sections.Details;
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <StyledGrid
      container
      className="GRID_CONTAINER"
      sx={{ minHeight: "100vh" }}
    >
      <Header />
      <Grid
        item
        xs={12}
        md={6}
        className="GRID_ITEM"
        mb={12}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <About />
        <Experience />
        <br />
        <br />
        <br />
        <Toolkit />
      </Grid>
    </StyledGrid>
  );
});

export default Details;
