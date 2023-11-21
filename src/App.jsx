import MusicToggle from "@components/MusicToggle";
import Mysection from "@components/Mysection";
import typography from "@components/typography";
import { Animation, Pages } from "@constants";
import useAppContext from "@contexts/AppContext";
import useLoadingContext from "@contexts/LoadingContext";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Details from "@pages/Details";
import Hero from "@pages/Hero";
import { AnimatePresence, motion } from "framer-motion";
import { Leva } from "leva";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import { IoMusicalNotes } from "react-icons/io5";
import Sound from "react-sound";

function Loader({ progress, onFinish }) {
  if (progress >= 100) {
    onFinish();
  }

  return (
    <Div100vh className="loading" style={{ zIndex: 1001 }}>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: Animation.duration }}
      >
        <div className="loading-bar-container" style={{ position: "relative" }}>
          <div className="loading-bar" style={{ width: progress }}>
            <Typography
              variant="h6"
              textAlign="center"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {Math.round(progress)}%
            </Typography>
          </div>
        </div>
      </motion.div>
    </Div100vh>
  );
}

function GateKeeper({ onClick }) {
  const { mobile } = useMobile();

  const handleClick = useCallback((value) => {
    onClick(value);
  }, []);

  return (
    <Div100vh className="loading" style={{ zIndex: 1001 }}>
      <motion.div
        key="gatekeeper"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: Animation.duration }}
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
    </Div100vh>
  );
}

function makeColorDarker(rgbColor, factor = 10) {
  const [r, g, b] = rgbColor.match(/\d+/g).map(Number);

  const darkerR = Math.max(0, Math.round(r - factor));
  const darkerG = Math.max(0, Math.round(g - factor));
  const darkerB = Math.max(0, Math.round(b - factor));

  return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
}

const App = memo(() => {
  const section1 = useRef();
  const section2 = useRef();
  const { progress } = useLoadingContext();
  const { activePage } = usePageContext();
  const { enter, setEnter, musicPlayState, playMusic, allowMusic } =
    useAppContext();
  const { mobile } = useMobile();
  const [delayedStart, setDelayedStart] = useState(false);

  useEffect(() => {
    if (activePage !== Pages.Details) {
      const root = document.body;
      root.style.backgroundColor = makeColorDarker(
        "rgb(15, 23, 42)",
        mobile ? 20 : 10
      );
      const opacity = mobile ? 40 : 80;
      const size = mobile ? 600 : 1000;
      const str =
        "radial-gradient(" +
        size +
        "px at " +
        50 +
        "% " +
        50 +
        "%, rgba(29, 78, 216, 0.15), transparent " +
        opacity +
        "%)";
      console.log("xxx str:", mobile, str);
      $("#root").css("background", str);
    } else {
      const root = document.body;
      root.style.backgroundColor = "rgb(15, 23, 42)";
    }
  }, [activePage, mobile]);

  const timer = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const root = document.getElementById("root");
      if (!root) return;

      // if (mobile) {
      //   root.style.background = "none";
      //   window.removeEventListener("mousemove", handleMouseMove);
      //   return;
      // }

      cancelAnimationFrame(timer.current);

      timer.current = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        $("#root").css(
          "background",
          "radial-gradient(600px at " +
            x +
            "px " +
            y +
            "px, rgba(29, 78, 216, 0.15), transparent 80%)"
        );
      });
    },
    [mobile]
  );

  useEffect(() => {
    if (activePage === Pages.Details) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, activePage]);

  return (
    <>
      {/* <AlignmentDiv /> */}
      <MusicToggle />
      <Leva hidden />
      <AnimatePresence>
        {!delayedStart && (
          <Loader
            progress={progress}
            onFinish={() => {
              setTimeout(() => {
                setDelayedStart(true);
              });
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!enter && delayedStart && (
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
            sectionName={Pages.Hero}
            threshold={0.8}
            sx={{ height: "100vh", overflow: "hidden" }}
          >
            <Hero />
          </Mysection>
        </div>
        <div ref={section2}>
          <Mysection sectionName={Pages.Details} threshold={0.1}>
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
  const theme = createTheme({
    ...typography,
    breakpoints: { values: breakpointValues },
  });

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
