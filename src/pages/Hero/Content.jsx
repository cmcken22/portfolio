import { Pages } from "@constants";
import useAppContext from "@contexts/AppContext";
import useLoadingContext from "@contexts/LoadingContext";
import usePageContext from "@contexts/PageContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, useMediaQuery } from "@mui/material";
import { a, useTransition } from "@react-spring/web";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Div100vh, { use100vh } from "react-div-100vh";
import SkullAnimation from "../../SkullAnimation";
import { loadingContext } from "@contexts/LoadingContext";

const useCustomBreakPoints = () => {
  const xs = useMediaQuery("(max-width: 480px)");
  const sm = useMediaQuery("(min-width: 481px) and (max-width: 767px)");
  const md = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const lg = useMediaQuery("(min-width: 1024px) and (max-width: 1199px)");
  const xl = useMediaQuery("(min-width: 1200px)");

  if (xs) return "xs";
  if (sm) return "sm";
  if (md) return "md";
  if (lg) return "lg";
  if (xl) return "xl";
  return "xl";
};

function ScrollIndicator({ active }) {
  const h = use100vh();

  const transition = useTransition(active, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition((style, active) => {
    if (!active) return null;
    return (
      <a.div
        style={{
          position: "absolute",
          top: `calc(${h}px - 40px - 1rem)`,
          height: "40px",
          width: "40px",
          left: "0",
          right: "0",
          margin: "0 auto",
          zIndex: 3,
          cursor: "pointer",
          ...style,
        }}
      >
        <KeyboardArrowDownIcon
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
      </a.div>
    );
  });
}

function calculateScaleFactor(inputWidth, baseWidth = 1024) {
  if (inputWidth <= 0) {
    throw new Error("Input width must be a positive integer.");
  }

  const scaleFactor = (2 * inputWidth) / baseWidth;
  if (scaleFactor >= 2.5) return 2.5;
  return scaleFactor;
}

const Content = () => {
  const { loading } = useLoadingContext();
  const { enter } = useAppContext();
  const inView = usePageContext()?.activePage === Pages.Hero;
  const skullAnimation = useRef(null);
  const windowHeight = use100vh();
  // const windowHeight = useMemo(() => 740);

  const bp = useCustomBreakPoints();

  const getScalar = useCallback(() => {
    // if (bp === "xs") return 0.9;
    // if (bp === "sm") return 1.15;
    // if (bp === "md") return 1.5;
    // if (bp === "lg") return 2;
    // if (bp === "xl") return 2.5;
    // return 1;
    return calculateScaleFactor(window.innerWidth);
  }, [bp]);

  const getPosition = useCallback(() => {
    // if (bp === "xs") return 0.2;
    // if (bp === "sm") return 0.2;
    // if (bp === "md") return 0.25;
    // if (bp === "lg") return 0.35;
    // if (bp === "xl") return 0.5;
    return 0;
  }, [bp]);

  const init = useCallback(() => {
    skullAnimation.current = new SkullAnimation(
      getPosition(),
      getScalar(),
      windowHeight
    );
  }, [windowHeight, getPosition, getScalar]);

  useEffect(() => {
    if (!skullAnimation.current && windowHeight) {
      init();
      // skullAnimation.current = null;
      console.log("skullAnimation:", skullAnimation.current);
      // loadingContext.getState().incrementProgress(100);
    }
  }, [init, windowHeight]);

  useEffect(() => {
    return () => {
      if (!skullAnimation.current) return;
      skullAnimation.current.destroy();
      skullAnimation.current = null;
    };
  }, []);

  const text1 = "Conner";
  const text2 = "McKenna";

  useEffect(() => {
    if (!loading) {
      if (!enter) {
        console.log("FINISHED LOADING", enter);
        skullAnimation.current?.pause();
      } else {
        console.log("FINISHED LOADING", enter);
        skullAnimation.current?.setAllowRotation(true);
        skullAnimation.current?.resume();
      }
    }
  }, [loading, enter]);

  const timer = useRef(null);

  useEffect(() => {
    if (!inView) {
      clearTimeout(timer.current);
      skullAnimation.current?.pause();
    } else {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (skullAnimation?.current) {
          skullAnimation.current?.resume();
        }
      }, 500);
    }
  }, [inView]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "x") {
        skullAnimation.current?.resize();
      }
    },
    [windowHeight, init]
  );

  const resizeTimer = useRef(null);
  const handleResize = useCallback(() => {
    const scalar = getScalar();
    skullAnimation.current?.setScalar(scalar);
    skullAnimation.current?.resize();

    clearTimeout(resizeTimer.current);
    resizeTimer.current = setTimeout(() => {
      handleResize();
    }, 500);
  }, [getScalar]);

  useEffect(() => {
    // window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      // window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleKeyDown, handleResize]);

  const barrier = 0;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Div100vh className="headline-container">
        <div id="text-behind" className="hero-text">
          {text1}
          <br />
          {text2}
        </div>
        <div id="text-behind-blur" className="hero-text">
          {text1}
          <br />
          {text2}
        </div>
        <div id="text-front" className="hero-text">
          {text1}
          <br />
          {text2}
        </div>
        <ScrollIndicator active={inView && enter} />
      </Div100vh>

      <Div100vh
        className="canvas-container"
        style={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: `${barrier}px !important`,
            width: "100%",
          }}
        />
        <Box
          sx={{
            height: `calc(100% - ${barrier * 2}px) !important`,
            width: "100%",
          }}
        >
          <canvas id="canvas" height="100%" />
        </Box>
        <Box
          sx={{
            height: `${barrier}px !important`,
            width: "100%",
            background: "red",
          }}
        />
      </Div100vh>
    </div>
  );
};

export default Content;
