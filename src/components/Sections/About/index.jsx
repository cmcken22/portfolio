import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../../section";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import Content from "./Content";

const About = ({ domContent, position, bgColor, scrollToPos, mobile }) => {
  const { viewport } = useThree();

  const [refItem, inView] = useInView({
    threshold: 0,
  });
  const [refItem2, inView2] = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView, scrollToPos, position]);

  useEffect(() => {
    const pos = viewport?.factor * viewport?.height * 0;
    if (inView) {
      scrollToPos(pos);
    }
  }, [inView, scrollToPos, viewport?.factor, viewport?.height]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <Html fullscreen portal={domContent}>
          <div
            className="container"
            ref={(r) => {
              refItem(r);
              refItem2(r);
            }}
          >
            <Content mobile={mobile} inView={inView} scrollingAway={!inView2} />
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default About;
