import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const lastSection = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
        // console.clear();
        console.log("__data.scroll.current:", data.scroll.current);
        // lastScroll.current = data.scroll.current;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      console.log(">>>:", data.scroll.current);
      lastScroll.current = data.scroll.current;
      return;
    }
    if (lastScroll?.current === data.scroll.current) return;
    if (data?.scroll?.current === 0) return;
    if (data?.scroll?.current === 1) return;

    const curSection = Math.floor(data.scroll.current * data.pages);
    console.log("curSection:", curSection, `${data.scroll.current}`);

    if (curSection !== lastSection.current) {
      onSectionChange(curSection);
    }

    // console.log("data.scroll.current:", data.scroll.current);
    // console.log("curSection:", curSection);

    // if (data.scroll.current > lastScroll.current) {
    //   // console.log("curr:", data?.scroll?.current);
    //   // console.log("last:", lastScroll?.current);
    //   // console.log("isAnimating:", isAnimating?.current);
    //   // onSectionChange(1);
    //   console.log("SCROLLING DOWN:", curSection <= data?.pages);
    //   if (curSection <= data?.pages) {
    //     // isAnimating.current = true;
    //     onSectionChange(curSection + 1);
    //     lastSection.current = curSection;
    //   }
    // } else {
    //   console.log("SCROLLING UP:", curSection > 0);
    //   if (curSection > 0) {
    //     // isAnimating.current = true;
    //     onSectionChange(curSection - 1);
    //   }
    // }

    // if (
    //   data.scroll.current < lastScroll.current &&
    //   data.scroll.current < 1 / (data.pages - 1)
    // ) {
    //   isAnimating.current = true;
    //   onSectionChange(curSection - 1);
    // }

    // if (data.scroll.current > lastScroll.current && curSection === 0) {
    //   onSectionChange(1);
    // }
    // if (
    //   data.scroll.current < lastScroll.current &&
    //   data.scroll.current < 1 / (data.pages - 1)
    // ) {
    //   onSectionChange(0);
    // }
    lastScroll.current = data.scroll.current;
    lastSection.current = curSection;
  });

  return null;
};
