import { CanvasSection } from "@components/CanvasSection";
import { Html } from "@react-three/drei";
import Content from "./Content";

const HeroSection = ({ position }) => {
  return (
    <CanvasSection factor={1.5} offset={1}>
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
