import { Box } from "@mui/material";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Mysection = memo(
  ({ sectionName, children, threshold, minHeight, sx }) => {
    const { setActivePage } = usePageContext();
    const { mobile } = useMobile();

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
        id={sectionName}
        ref={sectionRef}
        sx={{
          minHeight: minHeight ?? "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(!mobile && {
            scrollSnapStop: "always",
            scrollSnapAlign: "start",
          }),
          ...sx,
        }}
      >
        {children}
      </Box>
    );
  }
);

Mysection.defaultProps = {
  scrollSnap: true,
};

export default Mysection;
