import Mysection from "@components/Mysection";
import Details from "@components/Sections/Details";
import Hero from "@components/Sections/Hero";
import { Sections } from "@constants";
import useLoadingContext from "@contexts/LoadingContext";
import { Box } from "@mui/material";
import { a, useTransition } from "@react-spring/web";
import { Leva } from "leva";
import { useRef } from "react";

function Loader({ active, total, progress, _a }) {
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0, progress: 100 },
    update: { progress },
  });

  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

function App() {
  const section1 = useRef();
  const section2 = useRef();
  const { progress } = useLoadingContext();

  return (
    <>
      <Leva hidden />
      <Loader active={progress < 100} progress={progress} />
      <Box
        className="__container"
        style={{
          position: "relative",
          overflowY: "auto",
          overscrollBehaviorY: "contain",
          scrollSnapType: "y mandatory",
          height: "100vh",
          width: "100%",
          scrollbarWidth: "none",
          scrollSnapStop: "always",
          zIndex: 1,
        }}
      >
        <div ref={section1}>
          <Mysection
            sectionName={Sections.Hero}
            threshold={0.8}
            sx={{ height: "100vh" }}
          >
            <Hero />
          </Mysection>
        </div>
        <div ref={section2}>
          <Mysection sectionName={Sections.Details} threshold={0.1}>
            <Details />
          </Mysection>
        </div>
      </Box>
    </>
  );
}

export default App;
