import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { memo } from "react";
import HeroSection from "./HeroSection";

const Lights = () => {
  return <ambientLight intensity={1} />;
};

const Hero = memo(() => {
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
  );
});

export default Hero;
