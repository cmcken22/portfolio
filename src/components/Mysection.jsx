import useSectionContext from "@contexts/SectionContext";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
gsap.registerPlugin(ScrollTrigger);

const Mysection = memo(({ sectionName, children, threshold, sx }) => {
  const { setActiveSection } = useSectionContext();

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
        scrollSnapStop: "always",
        scrollSnapAlign: "start",
        // position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

export default Mysection;