import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../../section";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import Content from "./Content";
import { Button } from "@mui/material";

const About = ({ domContent, position, mobile }) => {
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <Html fullscreen portal={domContent}>
          <div className="container">
            <Content mobile={mobile} />
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default About;
