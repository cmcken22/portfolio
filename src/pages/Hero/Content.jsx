import { Box } from "@mui/material";
import useAppContext from "contexts/AppContext";
import useLoadingContext from "contexts/LoadingContext";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Pages } from "enums";
import { useCallback, useEffect, useRef } from "react";
import Div100vh, { use100vh } from "react-div-100vh";
import SkullAnimation from "../../SkullAnimation";

function calculateScaleFactor(inputWidth, mobile) {
  if (inputWidth <= 0) return 0;

  if (mobile) {
    const baseWidth = 430;
    const scaleFactor = (1.25 * inputWidth) / baseWidth;
    if (scaleFactor >= 1.5) return 1.5;
    return scaleFactor;
  }

  const baseWidth = 1024;
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

const useParallaxScroll = (inView) => {
  const scrollElm = useRef(null);
  const textBehind = useRef(null);
  const textFront = useRef(null);
  const textBehindBlur = useRef(null);
  const canvasRect = useRef(null);

  // Define the increment of scaling
  // Text scaling
  const parallaxScaling1 = useRef(0.0005);
  // Canvas scaling
  const parallaxScaling2 = useRef(0.00025);
  // Three.js Camera Rotation Speed
  const parallaxScaling3 = useRef(0.0000001);

  // Initialize scroll and ease values
  let currentScroll = useRef(0);
  let targetScroll = useRef(0);
  let ease = useRef(0.001);

  // Define a global variable to connect scroll-based animations to 3D animations.
  let theta1 = useRef(0);

  useEffect(() => {
    textBehind.current = document.getElementById("text-behind");
    textFront.current = document.getElementById("text-front");
    textBehindBlur.current = document.getElementById("text-behind-blur");
    canvasRect.current = document.getElementById("canvas");
  }, []);

  // This function updates the scale and position of the elements on scroll
  function updateScale() {
    // Get the top and bottom position of the canvasRect element relative to the viewport.
    let rect = canvasRect.current.getBoundingClientRect();

    // Calculate the start and end scroll positions relative to the top of the document.
    // window.pageYOffset provides the amount of pixels that the document is currently scrolled vertically.
    // Adding rect.top/rect.bottom converts the relative viewport position to an absolute document position.
    let startScrollPosition = window.pageYOffset + rect.top;
    let endScrollPosition = window.pageYOffset + rect.bottom;

    // The condition checks the following:
    // 1. If the bottom edge of the viewport is above the starting position of our target element or
    // 2. If the top edge of the viewport is below the ending position of our target element.
    // In other words, it checks if the target element is outside the current viewport.
    if (
      targetScroll.current + window.innerHeight < startScrollPosition ||
      targetScroll.current > endScrollPosition
    ) {
      // If either of the conditions is true, we are not viewing the element and thus we should exit (return) from the function early, without updating the parallax effects.
      return;
    }

    // The currentScroll value is being adjusted to gradually approach the targetScroll value.
    // This creates a smoother, easing effect rather than directly jumping to the target value.
    currentScroll.current +=
      (targetScroll.current - currentScroll.current) * ease.current;
    // console.log("currentScroll:", currentScroll);

    let scaleValue1 = 1 + currentScroll.current * parallaxScaling1.current;
    let scaleValue2 = 1 + currentScroll.current * parallaxScaling2.current;

    // Use the scaleValue to adjust the transform property for scaling
    textBehind.current.style.transform = `scale(${scaleValue1})`;
    textFront.current.style.transform = `scale(${scaleValue1})`;
    textBehindBlur.current.style.transform = `scale(${scaleValue1})`;
    canvasRect.current.style.transform = `scale(${scaleValue2})`;

    // Modulate theta1 based on the current scrolling offset.
    // This provides a connection between the 2D scrolling experience and the 3D Three.js animations.
    theta1.current += currentScroll.current * parallaxScaling3.current;

    // setTimeout is a way to delay the execution of the function.
    // By calling updateScale with a delay of approximately 1/60th of a second, we're mimicking the behavior of requestAnimationFrame, aiming to update the parallax effect about 60 times per second.
    // This makes the animation smoother by spreading the updates across small time intervals, making transitions less abrupt and more visually appealing.
    setTimeout(updateScale, 1000 / 60); // approximately 60 times per second
  }

  const handleScroll = useCallback(
    (e) => {
      // console.log("e.target.scrollTop:", e.target.scrollTop);
      targetScroll.current = e.target.scrollTop;
      updateScale();
    },
    [updateScale]
  );

  useEffect(() => {
    scrollElm.current = document.querySelector(".__container");
    if (scrollElm.current) {
      if (inView) {
        scrollElm.current.addEventListener("scroll", handleScroll);
      } else {
        scrollElm.current.removeEventListener("scroll", handleScroll);
      }
    }
    return () => {
      if (scrollElm.current) {
        scrollElm.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, inView]);
};

const Content = () => {
  const { loading } = useLoadingContext();
  const { enter } = useAppContext();
  const { mobile } = useMobile();
  const inView = usePageContext()?.activePage === Pages.Hero;
  const skullAnimation = useRef(null);
  const windowHeight = use100vh();
  useParallaxScroll(inView);

  const getScalar = useCallback(() => {
    return calculateScaleFactor(window.innerWidth, mobile);
  }, [mobile]);

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
    handleResize();
  }, [mobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
