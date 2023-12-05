import { Box } from "@mui/material";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Animation, Pages } from "enums";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";

const FadeInDiv = ({ children, active, index = 0, ...rest }) => {
  const timer = useRef(null);
  const controls = useAnimation();
  const { small } = useMobile();
  const inView = usePageContext()?.activePage === Pages.Details;

  const activeState = useMemo(() => {
    return { opacity: 1 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0 };
  }, []);

  const handleViewportEnter = useCallback(
    (x) => {
      if (!inView) return;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        controls.start(activeState);
      }, (500 / index) * 0.1);
    },
    [controls, index, activeState, inView, rest]
  );

  useEffect(() => {
    if (active) {
      handleViewportEnter(1);
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
      // initial={small ? { opacity: 1 } : { opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      // onViewportEnter={() => controls.start({ opacity: 1 })}
      onViewportEnter={() => handleViewportEnter(2)}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default FadeInDiv;
