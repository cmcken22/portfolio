import useAnimation from "./useAnimation";
import { a, useTransition } from "@react-spring/web";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { Menu } from "@mui/material";
import { MenuContext } from "../../../contexts/MenuContext";
import { useSectionContext } from "../../../App";
import Spline from "@splinetool/react-spline";

function ScrollIndicator({ active }) {
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
          bottom: "0%",
          height: "40px",
          width: "40px",
          // background: "blue",
          zIndex: 3,
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

const Content = ({ mobile, scrollingAway }) => {
  const inView = useSectionContext((state) => state.activeSection) === "Hero";
  useAnimation(inView, mobile);
  // useAnimation2(inView, mobile);

  const text1 = "Conner";
  const text2 = "McKenna";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="headline-container">
        <div id="text-behind">
          {text1}
          <br />
          {text2}
        </div>
        <div id="text-behind-blur">
          {text1}
          <br />
          {text2}
        </div>
        <div id="text-front">
          {text1}
          <br />
          {text2}
        </div>
        <ScrollIndicator active={!scrollingAway} />
      </div>

      <div className="canvas-container">
        <canvas id="canvas"></canvas>
      </div>
      {/* <div className="canvas-container">
        <Spline scene="https://prod.spline.design/rejY8jiGrk0axCFM/scene.splinecode" />
      </div> */}
    </div>
  );
};

export default Content;
