import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../section";
import { useThree } from "@react-three/fiber";

const Content = () => {
  return (
    <h1 className="title">
      <span>Contact Me</span>
    </h1>
  );
};

const Contact = ({ domContent, position, bgColor, scrollToPos }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  useEffect(() => {
    const pos = viewport?.factor * viewport?.height * 3;
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

export default Contact;