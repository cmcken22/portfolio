import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { memo, useState } from "react";
import Div100vh from "react-div-100vh";
import HeroSection from "./HeroSection";
import Content from "./Content";

const Lights = () => {
  return <ambientLight intensity={1} />;
};

const Hero = memo(() => {
  const [displayDivAlignment, setDisplayDivAlignment] = useState(!true);

  return (
    <>
      {displayDivAlignment && (
        <Div100vh
          style={{
            top: "0px",
            position: "fixed",
            background: "rgba(255, 0, 255, 0.4)",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(255, 0, 255, 0.4)",
              height: "100px",
              width: "100%",
            }}
          />
        </Div100vh>
      )}
      <Content />
    </>
  );
});

export default Hero;
