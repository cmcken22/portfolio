import Mysection from "@components/Mysection";
import Details from "@components/Sections/Details";
import Hero from "@components/Sections/Hero";
import { Sections } from "@constants";
import useLoadingContext from "@contexts/LoadingContext";
import useMobile from "@contexts/useMobile";
import { Box, Button } from "@mui/material";
import { a, useTransition } from "@react-spring/web";
import createActivityDetector from "activity-detector";
import { Leva } from "leva";
import { useEffect, useRef, useState } from "react";
import Sound from "react-sound";
const activityDetector = createActivityDetector();

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

export default () => {
  const { mobile } = useMobile();
  const prevMobile = useRef(mobile);
  const [playState, setPlayState] = useState(Sound.status.STOPPED);

  useEffect(() => {
    if (prevMobile.current !== mobile && prevMobile.current !== null) {
      window.location.reload();
    }
    prevMobile.current = mobile;
  }, [mobile]);

  return (
    <>
      <App />
      <Button
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 4000,
        }}
        onClick={() => {
          if (playState === Sound.status.STOPPED) {
            setPlayState(Sound.status.PLAYING);
          } else {
            setPlayState(Sound.status.STOPPED);
          }
        }}
      >
        CLICK
      </Button>
      <Sound
        url="/portfolio/spotifydown.com - Never Loved.mp3"
        playStatus={playState}
        // playFromPosition={300 /* in milliseconds */}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}
        // onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    </>
  );
};
