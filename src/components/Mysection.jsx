import usePageContext from "contexts/PageContext";
import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Mysection = memo(({ sectionName, children, threshold, minHeight, sx }) => {
  const { setActivePage } = usePageContext();

  const [sectionRef, inView] = useInView({
    threshold,
  });

  useEffect(() => {
    if (inView) {
      setActivePage(sectionName);
    }
  }, [inView]);

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
        scrollSnapAlign: "start",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

export default Mysection;
