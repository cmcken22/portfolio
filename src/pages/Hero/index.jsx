import { Pages } from "@constants";
import useAppContext from "@contexts/AppContext";
import usePageContext from "@contexts/PageContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, useAnimation } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Div100vh, { use100vh } from "react-div-100vh";
import Content from "./Content";

export const ScrollIndicator = ({ active, onClick }) => {
  const controls = useAnimation();
  const h = use100vh();

  const activeState = useMemo(() => {
    return { opacity: 1 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0 };
  }, []);

  useEffect(() => {
    const state = active ? activeState : exitState;
    controls.start(state, { duration: 1, delay: active ? 2 : 0 });
  }, [active, activeState, exitState]);

  return (
    <motion.div
      key="scroll-indicator"
      className="scroll-indicator"
      onClick={onClick}
      initial={exitState}
      animate={controls}
      transition={{ ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: `calc(${h}px - 40px - 1rem)`,
        height: "40px",
        width: "40px",
        left: "0",
        right: "0",
        margin: "0 auto",
        zIndex: 4,
        cursor: "pointer",
      }}
    >
      <KeyboardArrowDownIcon
        sx={{
          height: "100%",
          width: "100%",
        }}
      />
    </motion.div>
  );
};

const Hero = memo(() => {
  const [displayDivAlignment, setDisplayDivAlignment] = useState(!true);
  const { enter } = useAppContext();
  const inView = usePageContext()?.activePage === Pages.Hero;

  const handleScrollToNextPage = useCallback(() => {
    const elm = document.getElementById(Pages.Details);
    console.clear();
    console.log("elm:", elm);
    if (elm) {
      elm.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  const renderAlignmentDiv = useCallback(() => {
    return (
      <Div100vh
        style={{
          top: "0px",
          position: "fixed",
          background: "rgba(255, 0, 255, 0.4)",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          // pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(255, 0, 255, 0.4)",
            height: "100px",
            width: "100%",
          }}
        />
      </Div100vh>
    );
  }, []);

  return (
    <>
      {displayDivAlignment && renderAlignmentDiv()}
      <ScrollIndicator
        active={inView && enter}
        onClick={handleScrollToNextPage}
      />
      <Content />
    </>
  );
});

export default Hero;
