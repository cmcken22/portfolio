import { Html } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../section";
import { Skull } from "../Skull";
import { TypeAnimation } from "react-type-animation";
import { MacBook } from "../MacBook";
import { motion } from "framer-motion";
import { useThree } from "@react-three/fiber";

const Content = () => {
  return (
    <h1 className="title">
      <span>Past Experience</span>
    </h1>
  );
};

const PastExperience = ({ domContent, position, bgColor, scrollToPos }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  useEffect(() => {
    const pos = viewport?.factor * viewport?.height * 2;
    if (inView) {
      scrollToPos(pos);
    }
  }, [inView, scrollToPos, viewport?.factor, viewport?.height]);

  const scale = 30;

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} scale={[scale, scale, scale]}>
        <mesh ref={ref} position={[0, 0, 0]}>
          {/* <MacBook inView={inView} /> */}
        </mesh>
        <Html fullscreen portal={domContent}>
          <div
            ref={refItem}
            className="container"
            style={{
              margin: 0,
              justifyContent: "unset",
            }}
          >
            <Content />
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default PastExperience;
