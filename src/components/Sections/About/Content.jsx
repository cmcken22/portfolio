import useAnimation from "./useAnimation";
import { a, useTransition } from "@react-spring/web";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const Content = ({ inView, scrollingAway }) => {
  useAnimation(inView);
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
      <div class="headline-container">
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

      <div class="canvas-container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default Content;
