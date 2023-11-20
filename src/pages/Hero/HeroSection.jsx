import { CanvasSection } from "@components/CanvasSection";
import { Html } from "@react-three/drei";
import Content from "./Content";
import { use100vh } from "react-div-100vh";
import { useMemo } from "react";

const HeroSection = ({ position }) => {
  const h = use100vh();

  console.log("\n\n------------");
  console.log("____h:", h);
  console.log("innerHeight:", window.innerHeight);
  console.log("outerHeight:", window.outerHeight);
  console.log("position:", position);
  console.log("------------\n\n");

  const diff = useMemo(() => {
    if (h === null) return 0;
    return window.innerHeight - h;
  }, [h]);

  return (
    <CanvasSection factor={1.5} offset={1} diff={diff}>
      <group position={[0, position, 0]}>
        <Html
          fullscreen
          // portal={domContent}
        >
          <div className="container">
            <Content />
          </div>
        </Html>
      </group>
    </CanvasSection>
  );
};

export default HeroSection;
