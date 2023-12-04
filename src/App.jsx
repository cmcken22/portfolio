import AlignmentDiv from "components/AlignmentDiv";
import MusicToggle from "components/MusicToggle";
import Mysection from "components/Mysection";
import typography from "components/Typography";
import { Animation, Pages } from "enums";
import useAppContext from "contexts/AppContext";
import useLoadingContext from "contexts/LoadingContext";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Details from "pages/Details";
import Hero from "pages/Hero";
import { AnimatePresence, motion } from "framer-motion";
import { Leva } from "leva";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import { IoMusicalNotes } from "react-icons/io5";
import Sound from "react-sound";
import format from "string-template";
import Spacer from "components/Spacer";

const radialGradientTemplate =
  "radial-gradient({size}px at {x}px {y}px, rgba(29, 78, 216, 0.15), transparent {opacity}%)";
const radialGradientTemplatePercent =
  "radial-gradient({size}px at {x}% {y}%, rgba(29, 78, 216, 0.15), transparent {opacity}%)";

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
  const section3 = useRef();
  const { progress } = useLoadingContext();
  const { activePage } = usePageContext();
  const { enter, setEnter, musicPlayState, playMusic, allowMusic } =
    useAppContext();
  const { mobile } = useMobile();
  const [delayedStart, setDelayedStart] = useState(false);
  const mouseMoveTimer = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const displayAlignmentDiv = urlParams.get("alignment") === "true";

  useEffect(() => {
    const bgColor = "rgb(15, 23, 42)";
    if (activePage !== Pages.Details) {
      const root = document.body;
      root.style.backgroundColor = makeColorDarker(bgColor, mobile ? 20 : 10);
      const radialGradient = format(radialGradientTemplatePercent, {
        size: mobile ? 1000 : 1000,
        opacity: mobile ? 40 : 80,
        x: 50,
        y: 50,
      });
      $("#root").css("background", radialGradient);
    } else {
      const root = document.body;
      root.style.backgroundColor = bgColor;
    }
  }, [activePage, mobile]);

  const handleMouseMove = useCallback(
    (e) => {
      const root = document.getElementById("root");
      if (!root) return;

      cancelAnimationFrame(mouseMoveTimer.current);
      mouseMoveTimer.current = requestAnimationFrame(() => {
        const radialGradient = format(radialGradientTemplate, {
          size: 600,
          opacity: 80,
          x: e.clientX,
          y: e.clientY,
        });
        $("#root").css("background", radialGradient);
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
      <AlignmentDiv hidden={!displayAlignmentDiv} />
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
      />
      <Box
        className="__container"
        style={{
          position: "relative",
          // overflow: "auto",
          overflowY: "auto",
          overscrollBehaviorY: "contain",
          scrollSnapType: "y mandatory",
          height: "100vh",
          width: "100%",
          scrollbarWidth: "none",
          scrollSnapStop: "always",
          zIndex: 1,
          // backgroundColor: "red",
        }}
      >
        {/* <div ref={section1}> */}
          <Mysection
            sectionName={Pages.Hero}
            threshold={0.8}
            sx={{ height: "100vh", overflow: "hidden" }}
          >
            <Hero />
          </Mysection>
        {/* </div> */}
        {/* <div ref={section2}> */}
          <Mysection sectionName={Pages.Details} threshold={0.1}>
            <Details />
          </Mysection>
        {/* </div> */}
        {/* <div ref={section3}> */}
          <Mysection sectionName={Pages.Details} threshold={1} minHeight={'0px'}>
          </Mysection>
        {/* </div> */}
        {/* <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer /> */}
        {/* <div ref={section3}>
          <Mysection sectionName={"TEST"} threshold={0.1}>
          </Mysection>
        </div> */}
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
      // xxs: 0, // 639
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
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
