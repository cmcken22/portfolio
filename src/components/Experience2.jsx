import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "../config";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, Suspense, useMemo, useRef, useState } from "react";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import PastExperience from "./Sections/PastExperience";
import Contact from "./Sections/Contact";
import _state from "./state";
import useScrolling from "../contexts/useScrolling";

const useMobile = () => {
  const { size } = useThree();

  const mobile = useMemo(() => {
    return size?.width <= 400;
  }, [size?.width]);

  return mobile;
};

export const Experience2 = (props) => {
  const { menuOpened, domContent, scrollToPos } = props;
  const mobile = useMobile();
  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue();
  const lastScroll = useRef(0);
  // const [scrolling, setScrolling] = useState(false);
  const { scrolling, setScrolling } = useScrolling();

  useEffect(() => {
    const distance = 50;
    animate(cameraPositionX, menuOpened ? distance : 0, {
      // ...framerMotionConfig,
      type: "easeInOut",
    });
    animate(cameraLookAtX, menuOpened ? distance : 0, {
      // ...framerMotionConfig,
      type: "easeInOut",
    });
  }, [menuOpened]);

  useFrame((state) => {
    const nextScrolling = _state?.top?.current !== lastScroll.current;
    if (nextScrolling !== scrolling) {
      setScrolling(_state?.top?.current !== lastScroll.current);
    }
    lastScroll.current = _state?.top?.current;
  });

  console.log("scrolling:", scrolling);

  const bgColors = useMemo(() => {
    return {
      // About: "#f15946",
      About: "#11151c",
      Skills: "#571ec1",
      PastExperience: "#636567",
      // PastExperience: "#FFFFFF",
      Contact: "#571EC1",
    };
    // return {
    //   About: "#F39F5A",
    //   Skills: "#AE445A",
    //   PastExperience: "#662549",
    //   Contact: "#451952",
    // };
    // return {
    //   About: "#FFFD8C",
    //   Skills: "#97FFF4",
    //   PastExperience: "#7091F5",
    //   Contact: "#793FDF",
    // };
    // return {
    //   About: "#FFBB5C",
    //   Skills: "#FF9B50",
    //   PastExperience: "#E25E3E",
    //   Contact: "#C63D2F",
    // };
    // return {
    //   About: "#D67BFF",
    //   Skills: "#FFB6D9",
    //   PastExperience: "#FEFFAC",
    //   Contact: "#45FFCA",
    // };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <About
          bgColor={bgColors.About}
          position={250}
          domContent={domContent}
          scrollToPos={scrollToPos}
          menuOpened={menuOpened}
          mobile={mobile}
        />
        <Skills
          bgColor={bgColors.Skills}
          position={0}
          domContent={domContent}
          scrollToPos={scrollToPos}
        />
        <PastExperience
          bgColor={bgColors.PastExperience}
          position={-250}
          domContent={domContent}
          scrollToPos={scrollToPos}
        />
        <Contact
          bgColor={bgColors.Contact}
          position={-500}
          domContent={domContent}
          scrollToPos={scrollToPos}
        />
      </Suspense>
    </>
  );
};
