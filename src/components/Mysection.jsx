import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useSectionContext } from "../App";
gsap.registerPlugin(ScrollTrigger);

export default function Mysection({ sectionName, children, threshold, sx }) {
  const setActiveSection = useSectionContext((state) => state.setActiveSection);

  const [sectionRef, inView] = useInView({
    threshold,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView]);

  return (
    <Box
      className="MY_SECTION"
      ref={sectionRef}
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scrollSnapAlign: "center",
        // position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}