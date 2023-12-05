import { Box } from "@mui/material";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Animation, Pages } from "enums";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";

const SlideInDiv = ({ children, active, index = 0, ...rest }) => {
  const timer = useRef(null);
  const controls = useAnimation();
  const { small } = useMobile();
  const inView = usePageContext()?.activePage === Pages.Details;

  const activeState = useMemo(() => {
    return { opacity: 1, x: 0 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0, x: -500 };
  }, []);

  const handleViewportEnter = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      controls.start(activeState);
    }, (500 / index) * 0.1);
  }, [controls, index, activeState]);

  useEffect(() => {
    if (active) {
      handleViewportEnter();
    }
  }, [active]);

  useEffect(() => {
    if (!inView) {
      controls.start(exitState, { duration: 0 });
    }
  }, [inView, exitState]);

  if (small) {
    return <Box {...rest}>{children}</Box>;
  }

  return (
    <Box
      component={motion.div}
      initial={exitState}
      animate={controls}
      transition={{
        ease: "linear",
        duration: Animation.duration,
        delay: Animation.delay + index * 0.1,
      }}
      onViewportEnter={handleViewportEnter}
      sx={{
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SlideInDiv;
