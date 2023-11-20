import { Sections } from "@constants";
import useAppContext from "@contexts/AppContext";
import useLoadingContext from "@contexts/LoadingContext";
import usePageContext from "@contexts/PageContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMediaQuery } from "@mui/material";
import { a, useTransition } from "@react-spring/web";
import { useCallback, useEffect, useRef } from "react";
import { use100vh } from "react-div-100vh";
import SkullAnimation from "../../SkullAnimation";

// @media screen and (max-width: 480px)
/* Mobile Landscape */
// @media screen and (min-width: 481px) and (max-width: 767px)

/* Tablet */
// @media screen and (min-width: 768px) and (max-width: 1023px)

/* Small Desktop */
// @media screen and (min-width: 1024px) and (max-width: 1199px)

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
  console.log("use100vh:", h);

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
          // bottom: "0%",
          top: `calc(${h}px - 40px - 1rem)`,
          height: "40px",
          width: "40px",
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

const Content = () => {
  const { loading } = useLoadingContext();
  const { enter } = useAppContext();
  const inView = usePageContext()?.activePage === Sections.Hero;
  const skullAnimation = useRef(null);

  const bp = useCustomBreakPoints();

  const getScalar = useCallback(() => {
    if (bp === "xs") return 0.9;
    if (bp === "sm") return 1.15;
    if (bp === "md") return 1.5;
    if (bp === "lg") return 2;
    if (bp === "xl") return 2.5;
    return 1;
  }, [bp]);

  const getPosition = useCallback(() => {
    if (bp === "xs") return 0.2;
    if (bp === "sm") return 0.2;
    if (bp === "md") return 0.25;
    if (bp === "lg") return 0.35;
    if (bp === "xl") return 0.5;
    return 0.25;
  }, [bp]);

  useEffect(() => {
    console.clear();
    if (!skullAnimation.current) {
      skullAnimation.current = new SkullAnimation(getPosition(), getScalar());
      // skullAnimation.current = null;
      console.log("skullAnimation:", skullAnimation.current);
    }
  }, [getPosition, getScalar]);

  useEffect(() => {
    return () => {
      if (!skullAnimation.current) return;
      skullAnimation.current.destroy();
      skullAnimation.current = null;
    };
  }, []);

  useEffect(() => {
    const scalar = getScalar();
    const position = getPosition();
    skullAnimation.current?.setScalar(scalar);
    skullAnimation.current?.setPosition(position);

    console.log("bp:", bp);
    console.log("scalar:", scalar);
    console.log("position:", position);
  }, [bp]);

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

  const handleKeyDown = useCallback((e) => {
    if (e.key === "x") {
      console.log(
        "skullAnimation.current?.state:",
        skullAnimation.current?.state
      );
      // skullAnimation.current?.destroy();
      if (skullAnimation.current?.state === "PAUSED") {
        skullAnimation.current?.resume();
      } else {
        skullAnimation.current?.pause();
      }
    }
  }, []);

  const handleScroll = useCallback((e) => {
    // if (skullAnimation?.current) {
    //   skullAnimation.current?.pause();
    // }
    // clearTimeout(timer.current);
    // timer.current = setTimeout(() => {
    //   if (skullAnimation?.current) {
    //     skullAnimation.current?.resume();
    //   }
    // }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleKeyDown, handleScroll]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="headline-container">
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
      </div>

      <div className="canvas-container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default Content;
