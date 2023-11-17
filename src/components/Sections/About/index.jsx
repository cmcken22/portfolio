import { Html } from "@react-three/drei";
import { Section } from "../../section";
import Content from "./Content";

const About = ({ domContent, position, mobile, scrollTo }) => {
  console.log("domContent:", domContent);
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <Html fullscreen portal={domContent}>
          <div className="container">
            <Content mobile={mobile} scrollTo={scrollTo} />
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default About;
