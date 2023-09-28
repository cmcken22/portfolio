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
import { useInView } from "react-intersection-observer";
import { Section } from "./components/section";
import { Skull } from "./components/Skull";
import About from "./components/Sections/About";
import Skills from "./components/Sections/Skills";
import { a, useTransition } from "@react-spring/web";
import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "./config";
import PastExperience from "./components/Sections/PastExperience";
import { Menu } from "./components/Menu";
import { Experience2 } from "./components/Experience2";
import { button, useControls } from "leva";
import MenuContextProvider, { MenuContext } from "./contexts/MenuContext";
import { useThree } from "@react-three/fiber";

const HTMLContent = ({
  id,
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  // useFrame(() => {
  //   if (inView) {
  //     ref.current.rotation.y += 0.01;
  //   }
  // });
  if (id === "Skull") {
    console.log("inView:", inView);
  }

  const scale = 30;

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} scale={[scale, scale, scale]}>
        {/* <directionalLight position={[-5, 3, 5]} intensity={0.4} /> */}
        <mesh ref={ref} position={[0, 0, 0]}>
          {/* <Model url={modelPath} /> */}
          <Skull inView={inView} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

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

function Loader() {
  const { active, progress } = useProgress();
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
  const [events, setEvents] = useState();
  const canvasRef = useRef();
  const domContent = useRef();
  const scrollArea = useRef();
  const scrolling = useRef(false);
  // const [menuOpened, setMenuOpened] = useState(false);
  const { menuOpened, setMenuOpened } = useContext(MenuContext);

  const started = useRef(false);
  const currSection = useRef(0);
  const lastScroll = useRef(0);
  const lastDirection = useRef(null);
  const p = useRef([0, 940, 1880, 2820]);

  const onScroll = (e) => {
    // if (
    //   lastScroll?.current > e?.target?.scrollTop &&
    //   lastDirection?.current !== "up"
    // ) {
    //   lastDirection.current = "up";
    //   console.log("SCROLLING UP");
    //   currSection.current -= 1;
    //   const scrollPos = p?.current?.[currSection.current];
    //   console.log("scrollPos:", scrollPos);
    //   state.top.current = scrollPos;
    //   e.target.scrollTop = scrollPos;
    //   setTimeout(() => {
    //     lastDirection.current = null;
    //   }, 1000);
    // }
    // if (
    //   lastScroll?.current < e?.target?.scrollTop &&
    //   lastDirection?.current !== "down"
    // ) {
    //   lastDirection.current = "down";
    //   console.log("SCROLLING DOWN");
    //   currSection.current += 1;
    //   const scrollPos = p?.current?.[currSection.current];
    //   console.log("scrollPos:", scrollPos);
    //   state.top.current = scrollPos;
    //   e.target.scrollTop = scrollPos;
    //   setTimeout(() => {
    //     lastDirection.current = null;
    //   }, 1000);
    // }
    // lastScroll.current = e?.target?.scrollTop;

    return (state.top.current = e.target.scrollTop);
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  const { position } = useControls("Camera", {
    position: {
      x: 0,
      y: 0,
      z: 120,
    },
    Add: button((get) => {
      console.clear();
      const position = get("Camera.position");
      console.log({
        position,
      });
    }),
  });

  const scrollToPos = useCallback((pos) => {
    gsap.to(scrollArea?.current, {
      delay: 0,
      duration: 1,
      ease: "power3.inOut",
      scrollTop: pos,
      immediateRender: true,
      onStart: () => {
        scrolling.current = true;
      },
      onComplete: () => {
        state.top.current = pos;
        scrolling.current = false;
      },
    });
  }, []);

  const disableLeva = useMemo(() => {
    if (location?.hostname?.indexOf("localhost") === -1) return true;
    return false;
  }, []);

  return (
    <>
      <Leva hidden={disableLeva} />
      {/* <Header /> */}
      <Canvas
        ref={canvasRef}
        concurrent
        colorManagement
        camera={{ position: [position?.x, position?.y, position?.z], fov: 70 }}
        // eventPrefix="client"
        eventSource={domContent}
      >
        <Menu
          domContent={domContent}
          setMenuOpened={setMenuOpened}
          menuOpened={menuOpened}
        />
        <Background />
        <Lights />
        <Experience2
          domContent={domContent}
          menuOpened={menuOpened}
          scrollToPos={scrollToPos}
        />
      </Canvas>
      <Loader />
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}

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
    <App />
  </MenuContextProvider>
);
