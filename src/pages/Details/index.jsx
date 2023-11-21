import Spacer from "@components/Spacer";
import { Pages } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { Grid, styled } from "@mui/material";
import { useAnimation } from "framer-motion";
import { memo, useEffect } from "react";
import About from "./About";
import Experience from "./Experience";
import Footer from "./Footer";
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
}));

const Details = memo(() => {
  const inView = usePageContext().activePage === Pages.Details;
  const controls = useAnimation();
  const { mobile } = useMobile();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <StyledGrid
      id={Pages.Details}
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
        mb={mobile ? "15rem" : "6rem"}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <About />
        <Experience />
        <Spacer />
        <Toolkit />
        <Spacer />
        <Footer />
      </Grid>
    </StyledGrid>
  );
});

export default Details;
