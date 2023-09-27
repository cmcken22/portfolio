import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { Island } from "./Island";
import { Dolphin } from "./Dolphin";
import { MacBook } from "./MacBook";
import { MacBook2 } from "./MacBook2";
import { Buddha } from "./Buddha";
import Monkey from "./Monkey";
import { Buddha2 } from "./Buddha2";
import { Monkey2 } from "./Monkey2";
import { Faces } from "./Faces";
import { Skull } from "./Skull";

export const Experience = (props) => {
  const { section, menuOpened, onLoadComplete } = props;
  // const { viewport } = useThree();
  // const { size: x } = useThree();
  // // console.log("__x:", x);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const test = useMotionValue(0); //

  useEffect(() => {
    const testValue = test.get();
    animate(test, testValue === 0 ? 1 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraPositionX, menuOpened ? -2 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 2 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    // console.log("test:", test?.get());
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <motion.group
        // whileHover={{ scale: 1.2 }}
        // position={[1.5, 2, 3]}
        // scale={[10, 10, 10]}
        // rotation-y={-Math.PI / 4}
        // scale={[0, 0, 0]}
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: [0, 0.2, 0], // Animate the Y position to create a floating effect
          opacity: 1,
          // scale: [1, 1, 1], // Animate the Y position to create a floating effect
        }}
        transition={{
          y: {
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
          opacity: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        {/* <Island /> */}
        {/* <Monkey onLoadComplete={onLoadComplete} /> */}
        <Skull onLoadComplete={onLoadComplete} />
        {/* <Monkey2 /> */}
        {/* <Buddha2 /> */}
        {/* <Buddha /> */}
        {/* <Faces /> */}
      </motion.group>

      {/* SKILLS */}
      <group>
        {/* <directionalLight position={[-5, 3, 5]} intensity={0.4} /> */}
        {/* <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float> */}
        <group scale={[2, 2, 2]} position-y={-1.5}>
          {/* <Avatar animation={section === 0 ? "Falling" : "Standing"} /> */}
          {/* <Dolphin
            animation={section === 0 ? "" : "Swim"}
          /> */}
          <MacBook animation={section === 0 ? "" : "Swim"} />
          {/* <MacBook2
            animation={section === 0 ? "" : "Swim"}
          /> */}
        </group>
      </group>
    </>
  );
};
