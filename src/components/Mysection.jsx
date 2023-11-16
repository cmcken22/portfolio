import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Box } from "@mui/material";
gsap.registerPlugin(ScrollTrigger);

export default function Mysection({ children }) {
  const sectionRef = useRef();

  return (
    <Box
      ref={sectionRef}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scrollSnapAlign: "center",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
