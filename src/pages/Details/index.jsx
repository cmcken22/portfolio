import { Box, Grid, styled, useTheme } from "@mui/material";
import Spacer from "components/Spacer";
import usePageContext from "contexts/PageContext";
import useMobile, { useBreakPoint } from "contexts/useMobile";
import { Pages } from "enums";
import { useAnimation } from "framer-motion";
import { memo, useCallback, useEffect, useRef } from "react";
import About from "./About";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";
import Projects from "./Projects";
import Toolkit from "./Toolkit";

const StyledGrid = styled(Grid)(({ theme, mobile }) => ({
  ...(!mobile && {
    height: "100vh",
  }),
  ...(mobile && {
    width: "max-content",
    overflowX: "hidden",
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  }),
}));

const StyledBox = styled(Box)(({ theme }) => ({}));
const StyledBox2 = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    flexDirection: "row",
  },
}));

const Details = memo(() => {
  const inView = usePageContext().activePage === Pages.Details;
  const controls = useAnimation();
  const { mobile, small } = useMobile();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  const timer = useRef(null);
  const calcMargins = useCallback(() => {
    if (!containerRef.current) return;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    timer.current = setTimeout(() => {
      const width = containerRef.current?.clientWidth;
      if (width && width > 1280) {
        const margin = (width - 1280) / 2;
        containerRef.current.style.marginLeft = `${margin}px`;
        containerRef.current.style.marginRight = `${margin}px`;
      } else {
        containerRef.current.style.marginLeft = "0px";
        containerRef.current.style.marginRight = "0px";
      }
    }, 100);
  }, []);

  useEffect(() => {
    calcMargins();
  }, []);

  const handleResize = useCallback(
    (e) => {
      calcMargins();
    },
    [calcMargins]
  );

  useEffect(() => {
    handleResize();
  }, [mobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Header />
        <Grid
          item
          xs={12}
          md={6}
          className="GRID_ITEM"
          mb={mobile ? "9rem" : "6rem"}
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            marginLeft: "auto",
            // paddingBottom: "96px",
          }}
        >
          <About />
          <Experience />
          <Spacer />
          <Toolkit />
          <Spacer />
          <Projects />
          <Spacer />
          {mobile && <Spacer />}
          <Footer />
        </Grid>
      </>
    );
  }, [mobile]);

  const renderContentWithWrapper = useCallback(() => {
    return (
      <StyledBox
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "auto",
          display: "flex",
        }}
      >
        <StyledBox2
          ref={containerRef}
          sx={{
            display: "flex",
            margin: "0 auto",
            height: "fit-content",
            flexDirection: {
              sm: "column",
              md: "row",
            },
            ...(small && {
              width: "max-content",
              overflowX: "hidden",
            }),
          }}
        >
          {renderContent()}
        </StyledBox2>
      </StyledBox>
    );
  }, [small, renderContent]);

  return (
    <StyledGrid
      id={Pages.Details}
      container
      className="GRID_CONTAINER"
      sx={{ minHeight: "100vh" }}
      mobile={mobile}
    >
      {mobile ? renderContent() : renderContentWithWrapper()}
    </StyledGrid>
  );
});

export default Details;
