import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { memo, useState } from "react";
import Div100vh from "react-div-100vh";
import HeroSection from "./HeroSection";

const Lights = () => {
  return <ambientLight intensity={1} />;
};

const Hero = memo(() => {
  const [displayDivAlignment, setDisplayDivAlignment] = useState(false);

  const { position } = useControls("Camera", {
    position: {
      x: 0,
      y: 0,
      z: 120,
    },
    Add: button((get) => {
      console.clear();
      const position = get("Camera.position");
      console.log({
        position,
      });
    }),
  });

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
          }}
        >
          <div
            style={{
              // position: 'absolute',
              background: "red",
              height: "100px",
              width: "100%",
            }}
          ></div>
        </Div100vh>
      )}
      <Canvas
        camera={{
          position: [position?.x, position?.y, position?.z],
          fov: 70,
        }}
        eventPrefix="client"
        // eventSource={domContent}
      >
        <Lights />
        <HeroSection position={250} />
      </Canvas>
    </>
  );
});

export default Hero;
