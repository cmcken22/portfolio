import { Sections } from "@constants";
import useLoadingContext from "@contexts/LoadingContext";
import useSectionContext from "@contexts/SectionContext";
import useMobile from "@contexts/useMobile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { a, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import useAnimation from "./useAnimation";

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
  const { mobile } = useMobile();
  const { loading } = useLoadingContext();
  const [delayedStart, setDelayedStart] = useState(false);
  const inView = useSectionContext()?.activeSection === Sections.Hero;
  useAnimation(inView, mobile);

  const text1 = "Conner";
  const text2 = "McKenna";

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDelayedStart(true);
      }, 500);
    }
  }, [loading]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="headline-container" onClick={() => alert("click")}>
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
        <ScrollIndicator active={inView && delayedStart} />
      </div>

      <div className="canvas-container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default Content;
