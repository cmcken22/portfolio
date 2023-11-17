import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import useMobile from "../contexts/useMobile";
import useScrolling from "../contexts/useScrolling";
import About from "./Sections/About";
import _state from "./state";

const useStateManager = () => {
  const { size } = useThree();
  const { setMobile, setSize } = useMobile();
  const { scrolling, setScrolling } = useScrolling();
  const lastScroll = useRef(0);

  useEffect(() => {
    setMobile(size?.width <= 480);
    setSize(size);
  }, [size?.width, setMobile, setSize]);

  useFrame(() => {
    const {
      top: { current },
    } = _state;
    const currScrol = current === undefined || current === null ? 0 : current;
    const nextScrolling = currScrol !== lastScroll.current;
    if (nextScrolling !== scrolling) {
      setScrolling(currScrol !== lastScroll.current);
    }
    lastScroll.current = currScrol;
  });
};

export const Experience2 = (props) => {
  const { menuOpened, domContent, scrollToPos } = props;
  const { mobile } = useMobile();

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
          scrollTo={scrollTo}
          menuOpened={menuOpened}
          mobile={mobile}
        />
      </Suspense>
    </>
  );
};
