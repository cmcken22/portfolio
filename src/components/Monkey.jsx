import React, { useEffect, useMemo, useState } from "react";
import { useGLTF, TransformControls, OrbitControls } from "@react-three/drei";
import {
  Color,
  DebugLayerMaterial,
  Depth,
  Fresnel,
  LayerMaterial,
} from "lamina";
import * as LAYERS from "lamina";
import { button, useControls } from "leva";
import * as THREE from "three";
import initialMaterial from "./initialMaterial.js";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";

const M = () => {
  return (
    <LayerMaterial transparent lighting={"basic"} color={"white"} alpha={1}>
      <Depth
        near={-0.06800000000000028}
        far={5}
        origin={[0, 0, 3]}
        colorA={"#ff4eb8"}
        colorB={"#24dbf8"}
        alpha={1}
        name={"Depth"}
        mode={"normal"}
        visible={true}
        mapping={"vector"}
      />
      <Depth
        near={1}
        far={3}
        origin={[0, 0, -1.3670000000000089]}
        colorA={"#ff7800"}
        colorB={"black"}
        alpha={1}
        name={"Depth"}
        mode={"screen"}
        visible={true}
        mapping={"vector"}
      />
      <Fresnel
        color={"white"}
        alpha={1}
        bias={0}
        intensity={1}
        power={1.9099999999999757}
        name={"Fresnel"}
        mode={"softlight"}
        visible={true}
      />
    </LayerMaterial>
  );
};

export default function Monkey({ onLoadComplete }) {
  // const { nodes, scene } = useGLTF("/portfolio/models/monkey.glb");
  const { nodes, scene, materials } = useGLTF("/portfolio/models/Buddha.glb");
  const group = React.useRef();
  const { viewport } = useThree();
  const count = React.useRef(0);
  // console.log("x:", x);

  // const { layers, materialProps } = useBuddhaMaterials();
  // console.log("layers:", layers);
  const { rotation, position, scale } = useControls("Buddha", {
    rotation: {
      x: -0.45909999999999734,
      y: -0.3188999999999991,
      z: -0.042599999999999985,
    },
    position: {
      x: 1.4400000000000008,
      y: -2.9938290917584616,
      z: 0.8599999999999999,
    },
    scale: 24.000000000000007,
    Add: button((get) => {
      console.clear();
      const rotation = get("Buddha.rotation");
      const position = get("Buddha.position");
      const scale = get("Buddha.scale");
      console.log({
        rotation,
        position,
        scale,
      });
      navigator.clipboard.writeText({
        rotation,
        position,
        scale,
      });
    }),
  });

  useFrame((state) => {
    if (!group?.current) return;
    // console.log("yoo:", group?.current);
    if (count.current <= 3) count.current += 1;
    if (count.current === 3) onLoadComplete();
    // console.log("group?.current:", group?.current);
    // if (headFollow) {
    // console.log('group.current.getObjectByName("Sketchfab_Scene"):', group.current.getObjectByName("Sketchfab_Scene"));
    // console.log('state.mouse:', state.mouse);
    // group.current.getObjectByName("Sketchfab_Scene").lookAt(state.mouse.x, state.mouse.y, 1);
    // }
    // if (cursorFollow) {
    // const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
    // group.current.getObjectByName("Buddha").lookAt(target);
    // }
    // if (group.current && animation !== "" && animationComplete) {
    //   // group.current.rotation.x += 0.01; // Rotate around the x-axis
    //   group.current.rotation.y += 0.001; // Rotate around the y-axis
    //   // group.current.rotation.z += 0.01; // Rotate around the z-axis
    //   console.log('group.current:', group.current);
    // }
  });

  const arr = useMemo(() => {
    const arr = [
      {
        geometry: nodes.Group53508.geometry,
        material: materials.Default,
      },
      {
        geometry: nodes.Default.geometry,
        material: materials.Default,
      },
      {
        geometry: nodes["points-hair"].geometry,
        material: materials.Default,
      },
      {
        geometry: nodes.Group35213.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_0.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_0.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_1.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_1.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_2.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_2.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_3.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_3.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_4.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_4.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_5.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_0.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_5.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_6.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_6.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_1.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_2.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_3.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_0.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_4.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_1.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_5.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_2.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_6.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_3.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_7.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_4.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_8.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_5.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_9.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_7.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_10.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_7.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_11.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_6.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_12.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_7.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_13.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_8.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_14.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_9.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_8.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_15.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_10.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_16.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_9.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_17.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_10.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_18.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_11.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_19.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_11.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_12.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_20.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_13.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_21.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_12.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_14.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_13.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_15.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_14.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_16.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_15.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_17.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_16.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_18.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_17.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_19.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_18.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_20.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_22.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_19.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_21.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_20.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_23.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_8.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_24.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_9.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_25.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_10.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_26.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_11.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_27.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_12.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_28.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_13.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_29.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_14.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_30.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_15.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_31.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_22.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_32.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_21.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_33.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_16.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_34.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group27595_node_17.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_35.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_23.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_36.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_24.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_22.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_37.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_25.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_38.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_23.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_39.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_24.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_40.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_26.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_41.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17696_node_25.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17681_node_27.geometry,
        material: materials.defaultMat,
      },
      {
        geometry: nodes.Group17666_node_42.geometry,
        material: materials.defaultMat,
      },
    ];
    return arr;
  }, [nodes]);

  const comps = useMemo(() => {
    // if (!layers.length) return [];

    // console.log("layers:", layers);

    // console.log("customMaterial:", customMaterial);

    const res = [];
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (i === 0) {
        console.log("obj?.material:", obj?.material);
      }
      res.push(
        <mesh
          key={`Buddha--${i}`}
          geometry={obj.geometry}
          // material={obj.material}
          // material={customMaterial}
          // matrixAutoUpdate
        >
          <M />
        </mesh>
      );
    }

    return res;
  }, [arr]);

  // if (!layers.length) return null;
  // console.log("DONE:");

  return (
    <>
      {/* <motion.group
        initial={{ y: 1000 }} // Initial position and rotation
        animate={{
          y: 10, // Animate the Y position in a loop to create a floating effect
          // rotate: [0, 5, 0], // Animate rotation to add some organic movement
        }}
        transition={{
          y: {
            duration: 2, // Duration for the Y-axis animation
            ease: "easeInOut", // Easing function for smoother animation
            yoyo: Infinity, // Repeat the animation indefinitely
          },
          rotate: {
            duration: 3, // Duration for the rotation animation
            ease: "linear", // Linear easing for a constant rotation speed
            yoyo: Infinity, // Repeat the animation indefinitely
          },
        }}
      > */}
      {/* <TransformControls ref={transformControls}> */}
      <group
        name="Buddha"
        ref={group}
        scale={scale}
        position={[position?.x, position?.y, position?.z]}
        rotation={[rotation?.x, rotation?.y, rotation?.z]}
        onCreated={() => {
          console.log("______________yoooo:");
        }}
      >
        {comps}
        {/* {arr?.map((obj, i) => (
          <mesh
            key={`Buddha--${i}`}
            geometry={obj.geometry}
            material={obj.material}
          >
            <DebugLayerMaterial transparent {...materialProps}>
              {...layers}
            </DebugLayerMaterial>
          </mesh>
        ))} */}
        {/* <mesh
          matrixAutoUpdate
          geometry: nodes.Suzanne.geometry,
          rotation-y={Math.PI / 2}
          scale={30}
        >
          <DebugLayerMaterial transparent {...materialProps}>
            {...layers}
          </DebugLayerMaterial>
        </mesh> */}
      </group>
      {/* </TransformControls> */}
      {/* <OrbitControls ref={orbitControls} /> */}
      {/* </motion.group> */}
    </>
  );
}

// useGLTF.preload("/portfolio/models/monkey.glb");
useGLTF.preload("/portfolio/models/Buddha.glb");
