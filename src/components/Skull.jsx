/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Skull.glb 
Author: martinjario (https://sketchfab.com/martinjario)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/skull-downloadable-1a9db900738d44298b0bc59f68123393
Title: Skull downloadable
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { Depth, Fresnel, LayerMaterial } from "lamina";
import { button, useControls } from "leva";
import React, { useEffect } from "react";
import * as THREE from "three";

const M = () => {
  const { CA, CB, CC } = useControls("LIGHT", {
    CA: {
      x: -0.4,
      y: -0.5,
      z: -0.1,
    },
    CB: {
      x: 2,
      y: 0.1,
      z: -1,
    },
    CC: {
      x: 2,
      y: 0.1,
      z: -1,
    },
    Add: button((get) => {
      console.clear();
      const CA = get("LIGHT.CA");
      const CB = get("LIGHT.CB");
      const CC = get("LIGHT.CC");
      console.log({
        CA,
        CB,
        CC,
      });
      navigator.clipboard.writeText({
        CA,
        CB,
        CC,
      });
    }),
  });

  return (
    <LayerMaterial transparent lighting={"basic"} color={"white"} alpha={1}>
      <Depth
        near={-0.06800000000000028}
        far={5}
        origin={[CA.x, CA.y, CA.z]}
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
        origin={[CB.x, CB.y, CB.z]}
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

export function Skull(props) {
  const { onLoadComplete, inView, menuOpened } = props;
  const { nodes, materials } = useGLTF("/models/Skull.glb");
  const group = React.useRef();
  const count = React.useRef(0);

  const { rotation, position, scale } = useControls("Skull", {
    rotation: {
      x: -0.3,
      y: -0.4,
      z: -0.1,
    },
    position: {
      x: 2,
      y: 0.3,
      z: -2,
    },
    scale: 2.8,
    Add: button((get) => {
      console.clear();
      const rotation = get("Skull.rotation");
      const position = get("Skull.position");
      const scale = get("Skull.scale");
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

  const { color, roughness, metalness, envMapIntensity } = useControls(
    "Material",
    {
      color: "#000000",
      roughness: 0.1,
      metalness: 0.5,
      envMapIntensity: -5,
      Add: button((get) => {
        console.clear();
        const color = get("Material.color");
        const roughness = get("Material.roughness");
        const metalness = get("Material.metalness");
        const envMapIntensity = get("Material.envMapIntensity");
        console.log({
          color,
          roughness,
          metalness,
          envMapIntensity,
        });
      }),
    }
  );

  const groupPosX = useMotionValue(2);
  const groupPosY = useMotionValue(0.3);
  const groupPosZ = useMotionValue(-2);

  useEffect(() => {
    animate(groupPosX, menuOpened ? -3 : 2, {
      type: "easeInOut",
    });
    animate(groupPosY, menuOpened ? 0.3 : 0.3, {
      type: "easeInOut",
    });
    animate(groupPosZ, menuOpened ? -5 : -2, {
      type: "easeInOut",
    });
  }, [menuOpened]);

  useFrame((state) => {
    if (!group?.current) return;
    // if (inView) {
    //   group.current.rotation.y += 0.001;
    // }
    if (inView) {
      // console.log("state:", state?.mouse);
      const target = new THREE.Vector3(
        state.mouse.x + 30,
        state.mouse.y + 20,
        1
      );
      group.current.getObjectByName("Skull").lookAt(target);
    }
    // update rotation based off useMotionValue
    group.current.position.x = groupPosX.get();
    group.current.position.y = groupPosY.get();
    group.current.position.z = groupPosZ.get();
    // group.current.rotation.y += 0.001;
  });

  const material1 = new THREE.MeshStandardMaterial({
    // color: 0xffffff,
    color,
    roughness,
    metalness,
    envMapIntensity,
  });

  return (
    <group
      name="Skull"
      {...props}
      ref={group}
      dispose={null}
      scale={scale}
      position={[position?.x, position?.y, position?.z]}
      rotation={[rotation?.x, rotation?.y, rotation?.z]}
    >
      <mesh
        geometry={nodes.Object_2.geometry}
        // material={materials.defaultMat}
        material={material1}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {/* <M /> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Skull.glb");