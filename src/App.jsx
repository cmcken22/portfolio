import {
  Html,
  useProgress,
  useScroll,
  Scroll,
  ScrollControls,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Background } from "./components/Background";
import state from "./components/state";
import { a, useTransition } from "@react-spring/web";
import { Menu } from "./components/Menu";
import { Experience2 } from "./components/Experience2";
import { button, useControls } from "leva";
import MenuContextProvider, { MenuContext } from "./contexts/MenuContext";
import LoadingContextProvider, {
  LoadingContext,
} from "./contexts/LoadingContext";
import useLoading from "./contexts/useLoading";
import { Box, Grid, Typography } from "@mui/material";
import {
  ScrollContainer,
  SequenceSection,
  useGlobalState,
} from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
import Mysection from "./components/Mysection";
import Hero from "./components/Sections/Hero";
import { create } from "zustand";
import Details from "./components/Sections/Details";
import detectScroll from "@egstad/detect-scroll";
import useScrolling from "./contexts/useScrolling";

export const useSectionContext = create((set) => ({
  activeSection: "Hero",
  setActiveSection: (sectionName) =>
    set((state) => ({ activeSection: sectionName })),
}));

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      {/* <ambientLight intensity={0.3} /> */}
      <ambientLight intensity={1} />
      {/* Diretion light */}
      {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
      {/* <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      {/* Spotlight Large overhead light */}
      {/* <spotLight intensity={1} position={[1000, 0, 0]} castShadow /> */}
    </>
  );
};

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
            {/* <p>
              Loading {_a} out of {total} assets...
            </p> */}
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

function App() {
  const section1 = useRef();
  const section2 = useRef();
  const activeSection = useSectionContext((state) => state.activeSection);
  const scrollDetector = useRef();
  const setScrolling = useScrolling((state) => state.setScrolling);
  const [smoothScrollBar] = useGlobalState("smoothScrollBar");
  const [allowScroll, setAllowScroll] = useGlobalState("allowScroll");

  console.log("allowScroll:", allowScroll);

  useEffect(() => {
    if (activeSection === "About") {
      document.body.style.background = "#F2F3F4";
    } else {
      document.body.style.background = "#11151c";
    }
  }, [activeSection]);

  useEffect(() => {
    const elm2 = document.querySelector(".__container");
    if (elm2) {
      scrollDetector.current = new detectScroll(elm2, {
        events: {
          // scrollUp: () => console.log("scrolling up"),
          // scrollDown: () => console.log("scrolling down"),
          scrollStart: () => setScrolling(true),
          scrollStop: () => setScrolling(false),
        },
      });
    }

    return () => {
      if (scrollDetector?.current) {
        scrollDetector.current.destroy();
      }
    };
  }, []);

  return (
    <ScrollContainer damping={0.25}>
      <Leva hidden />
      <Box
        className="__container"
        style={{
          osition: "relative",
          overflowY: "auto",
          overscrollBehaviorY: "contain",
          scrollSnapType: "y mandatory",
          height: "100vh",
          width: "100%",
          scrollbarWidth: "none",
          scrollSnapStop: "always",
        }}
      >
        <div ref={section1}>
          <Mysection
            sectionName="Hero"
            threshold={0.8}
            sx={{
              height: "100vh",
            }}
          >
            <Hero />
          </Mysection>
        </div>
        <div ref={section2}>
          <Mysection sectionName="About" threshold={0.1}>
            <Details />
          </Mysection>
        </div>
      </Box>
    </ScrollContainer>
  );
}

// function App() {
//   const { active, progress, total, item } = useProgress();
//   const rest = useProgress();
//   console.log("rest:", rest);
//   console.log("__item:", item);
//   const [events, setEvents] = useState();
//   const canvasRef = useRef();
//   const domContent = useRef();
//   const scrollArea = useRef();
//   const scrolling = useRef(false);
//   // const [menuOpened, setMenuOpened] = useState(false);
//   const { menuOpened, setMenuOpened } = useContext(MenuContext);
//   const { loadingRefs, setLoading } = useLoading();

//   const fullProgress = useMemo(() => {
//     // if (loadingRefs?.About && progress > 10) {
//     //   return progress - 10;
//     // }
//     if (progress === 0) return 0;

//     return ((progress + (loadingRefs?.About ? 0 : 20)) / 120) * 100;
//   }, [progress, loadingRefs?.About]);
//   console.log("fullProgress:", fullProgress);

//   console.log("loadingRefs:", loadingRefs);

//   const [started, setStarted] = useState(false);
//   const begin = useRef(false);
//   const currSection = useRef(0);
//   const lastScroll = useRef(0);
//   const lastDirection = useRef(null);
//   const p = useRef([0, 940, 1880, 2820]);

//   const onScroll = (e) => {
//     if (!started) return;
//     // setScrolling(e.target.scrollTop !== lastScroll.current);
//     // lastScroll.current = e.target.scrollTop;
//     return (state.top.current = e.target.scrollTop);
//   };
//   useEffect(() => void onScroll({ target: scrollArea.current }), []);

//   useEffect(() => {
//     if (fullProgress === 100) {
//       setStarted(true);
//     }
//   }, [fullProgress]);

//   const { position } = useControls("Camera", {
//     position: {
//       x: 0,
//       y: 0,
//       z: 120,
//     },
//     Add: button((get) => {
//       console.clear();
//       const position = get("Camera.position");
//       console.log({
//         position,
//       });
//     }),
//   });

//   const scrollToPos = useCallback(
//     (pos) => {
//       if (!started) return;
//       gsap.to(scrollArea?.current, {
//         delay: 0,
//         duration: 1,
//         ease: "power3.inOut",
//         scrollTop: pos,
//         immediateRender: true,
//         onStart: () => {
//           scrolling.current = true;
//         },
//         onComplete: () => {
//           state.top.current = pos;
//           scrolling.current = false;
//         },
//       });
//     },
//     [started]
//   );

//   const disableLeva = useMemo(() => {
//     if (location?.hostname?.indexOf("localhost") === -1) return true;
//     // return false;
//     return !false;
//   }, []);

//   return (
//     <Box
//       sx={{
//         height: "200vh",
//         width: "100vw",
//         background: "red",
//       }}
//     >
//       <Box
//         sx={{
//           height: "50vh",
//           width: "100vw",
//           background: "green",
//         }}
//       ></Box>
//       <Box
//         sx={{
//           height: "100vh",
//           width: "100vw",
//           background: "blue",
//         }}
//       ></Box>
//     </Box>
//   );

//   return (
//     <>
//       <Leva hidden={disableLeva} />
//       {/* <Header /> */}
//       <Canvas
//         ref={canvasRef}
//         concurrent
//         colorManagement
//         camera={{ position: [position?.x, position?.y, position?.z], fov: 70 }}
//         eventPrefix="client"
//         eventSource={domContent}
//       >
//         <Background />
//         <Lights />
//         <Experience2
//           domContent={domContent}
//           menuOpened={menuOpened}
//           scrollToPos={scrollToPos}
//         />
//       </Canvas>
//       <Loader
//         active={fullProgress !== 100}
//         total={total}
//         _a={active}
//         progress={fullProgress}
//       />
//       <div
//         className="scrollArea"
//         ref={scrollArea}
//         onScroll={onScroll}
//         {...events}
//       >
//         <div style={{ position: "sticky", top: 0 }} ref={domContent} />
//         <div style={{ height: `${state.pages * 100}vh` }} />
//       </div>
//     </>
//   );
// }

// function App() {
//   const [section, setSection] = useState(0);
//   const [menuOpened, setMenuOpened] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const startDate = useMemo(() => new Date(), []);

//   useEffect(() => {
//     if (!loading) {
//       var endDate = new Date();
//       var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
//       console.clear();
//       console.log("seconds:", seconds);
//     }
//   }, [loading, startDate]);

//   useEffect(() => {
//     setMenuOpened(false);
//   }, [section]);

//   return (
//     <>
//       <MotionConfig
//         transition={{
//           ...framerMotionConfig,
//         }}
//       >
//         {loading && (
//           <div
//             style={{
//               position: "fixed",
//               height: "100vh",
//               width: "100vw",
//               backdropFilter: "blur(10px)",
//               // backgroundColor: "red",
//               zIndex: 1,
//             }}
//           >
//             <h1>Loading...</h1>
//           </div>
//         )}
//         <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
//           {/* <Background /> */}
//           <ScrollControls pages={4} damping={0.1}>
//             <ScrollManager section={section} onSectionChange={setSection} />
//             <Scroll>
//               <Experience
//                 section={section}
//                 menuOpened={menuOpened}
//                 onLoadComplete={() => setLoading(false)}
//               />
//             </Scroll>
//             <Scroll html>
//               <Interface />
//             </Scroll>
//           </ScrollControls>
//         </Canvas>
//         <Menu
//           onSectionChange={setSection}
//           menuOpened={menuOpened}
//           setMenuOpened={setMenuOpened}
//         />
//         <Cursor />
//       </MotionConfig>
//       <Leva hidden={false} />
//     </>
//   );
// }

export default () => (
  <MenuContextProvider>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </MenuContextProvider>
);
