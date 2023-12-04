import usePageContext from "contexts/PageContext";
import { Box } from "@mui/material";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useMobile from "contexts/useMobile";
import { Pages } from "enums";
// gsap.registerPlugin(ScrollTrigger);

const Mysection = memo(({ sectionName, children, threshold, sx, minHeight }) => {
  const { setActivePage } = usePageContext();
  const { mobile } = useMobile();
  // console.log('mobile:', mobile);

  const [sectionRef, inView] = useInView({
    threshold,
  });

  useEffect(() => {
    if (inView) {
      setActivePage(sectionName);
    }
  }, [inView]);

  if (sectionName === Pages.Details) {
    console.log('sectionName:', sectionName, inView);
    console.log('scrollSnapAlign:', sectionName === Pages.Details ? !inView ? "start" : "unset" : "start");
  }

  return (
    <Box
      key={`${sectionName}--section`}
      className="MY_SECTION"
      ref={sectionRef}
      sx={{
        minHeight: minHeight ?? "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scrollSnapStop: "always",
        // scrollSnapAlign: sectionName === Pages.Details ? !inView ? "start" : "unset" : "start",
        scrollSnapAlign: "start",
        // backgroundColor: sectionName === Pages.Details ? "rgba(255, 0, 255, 0.7)" : '',
        // position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

export default Mysection;
