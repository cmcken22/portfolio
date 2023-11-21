import { Pages } from "@constants";
import useAppContext from "@contexts/AppContext";
import useLoadingContext from "@contexts/LoadingContext";
import usePageContext from "@contexts/PageContext";
import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import Div100vh, { use100vh } from "react-div-100vh";
import SkullAnimation from "../../SkullAnimation";

function calculateScaleFactor(inputWidth, baseWidth = 1024) {
  if (inputWidth <= 0) return 0;

  const scaleFactor = (2 * inputWidth) / baseWidth;
  if (scaleFactor >= 2.5) return 2.5;
  return scaleFactor;
}

function calculatePositionFactor(inputWidth, baseWidth = 1024) {
  if (inputWidth <= 0) return 0;

  const positionFactor = (0.25 * inputWidth) / baseWidth;
  if (positionFactor >= 0.25) return 0.25;
  return positionFactor;
}

const Content = () => {
  const { loading } = useLoadingContext();
  const { enter } = useAppContext();
  const inView = usePageContext()?.activePage === Pages.Hero;
  const skullAnimation = useRef(null);
  const windowHeight = use100vh();

  const getScalar = useCallback(() => {
    return calculateScaleFactor(window.innerWidth);
  }, []);

  const getPosition = useCallback(() => {
    return calculatePositionFactor(window.innerWidth);
  }, []);

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
  const handleResize = useCallback(
    (e, doubleCall = true) => {
      const scalar = getScalar();
      const position = getPosition();
      skullAnimation.current?.setScalar(scalar);
      skullAnimation.current?.setPosition(position);
      skullAnimation.current?.resize();

      if (doubleCall) {
        clearTimeout(resizeTimer.current);
        resizeTimer.current = setTimeout(() => {
          handleResize(e, false);
        }, 500);
      }
    },
    [getScalar]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
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
