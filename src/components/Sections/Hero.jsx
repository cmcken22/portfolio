import { a, useTransition } from "@react-spring/web";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { memo } from "react";
import { Experience2 } from "../Experience2";

const Lights = () => {
  return <ambientLight intensity={1} />;
};

function Loader({ active, total, progress, _a }) {
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0, progress: 100 },
    update: { progress },
  });

  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            {/* <p>
              Loading {_a} out of {total} assets...
            </p> */}
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

const Hero = memo(({ scrollTo, domContent }) => {
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
      eventSource={domContent}
    >
      <Lights />
      <Experience2 scrollTo={scrollTo} domContent={domContent} />
    </Canvas>
  );
});

export default Hero;
