import { CanvasSection } from "components/CanvasSection";
import { Html } from "@react-three/drei";
import { button, useControls } from "leva";
import { useMemo } from "react";
import { use100vh } from "react-div-100vh";
import Content from "./Content";

const HeroSection = ({ position }) => {
  const h = use100vh();

  return <Content />;
};

export default HeroSection;
