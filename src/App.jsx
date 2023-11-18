import MusicToggle from "@components/MusicToggle";
import Mysection from "@components/Mysection";
import Details from "@components/Sections/Details";
import Hero from "@components/Sections/Hero";
import { Animation, Sections } from "@constants";
import useAppContext from "@contexts/AppContext";
import useLoadingContext from "@contexts/LoadingContext";
import useSectionContext from "@contexts/SectionContext";
import useMobile from "@contexts/useMobile";
import { Box, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { a, useTransition } from "@react-spring/web";
import { AnimatePresence, motion } from "framer-motion";
import { Leva } from "leva";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { IoMusicalNotes } from "react-icons/io5";
import Sound from "react-sound";

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

function GateKeeper({ onClick }) {
  const { mobile } = useMobile();

  const handleClick = useCallback((value) => {
    onClick(value);
  }, []);

  return (
    <motion.div
      key="gatekeeper"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: Animation.duration }}
      className="loading"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <button
        className={mobile ? "glow-on-hover-mobile" : "glow-on-hover"}
        type="button"
        onClick={() => handleClick(true)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <IoMusicalNotes />
          ENTER
          <IoMusicalNotes />
        </Box>
      </button>
      <Button
        className="alt-enter"
        type="button"
        sx={{
          color: "rgb(94, 234, 212)",
        }}
        onClick={() => handleClick(false)}
      >
        Enter
      </Button>
    </motion.div>
  );
}

const App = memo(() => {
  const section1 = useRef();
  const section2 = useRef();
  const { progress } = useLoadingContext();
  const { activeSection } = useSectionContext();
  const { enter, setEnter, musicPlayState, playMusic, allowMusic } =
    useAppContext();

  useEffect(() => {
    if (activeSection !== Sections.Details) {
      const root = document.getElementById("root");
      root.style.backgroundColor = "#11151c";
    } else {
      const root = document.getElementById("root");
      root.style.backgroundColor = "rgb(15, 23, 42)";
    }
  }, [activeSection]);

  return (
    <>
      <MusicToggle />
      <Leva hidden />
      <Loader active={progress < 100} progress={progress} />
      <AnimatePresence>
        {progress === 100 && !enter && (
          <GateKeeper
            onClick={(value) => {
              setEnter(true);
              if (value) {
                allowMusic(true);
                setTimeout(() => {
                  playMusic();
                });
              }
            }}
          />
        )}
      </AnimatePresence>
      <Sound
        url="/spotifydown.com - Never Loved.mp3"
        playStatus={musicPlayState}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}
        // onFinishedPlaying={this.handleSongFinishedPlaying}
      />
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
});

export default () => {
  const { mobile } = useMobile();
  const prevMobile = useRef(mobile);

  useEffect(() => {
    if (prevMobile.current !== mobile && prevMobile.current !== null) {
      // window.location.reload();
    }
    prevMobile.current = mobile;
  }, [mobile]);

  const breakpointValues = useMemo(
    () => ({
      xs: 0, // 639
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1400,
    }),
    []
  );
  const theme = createTheme({ breakpoints: { values: breakpointValues } });

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
