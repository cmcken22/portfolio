/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Buddha2.glb 
Author: Minneapolis Institute of Art (https://sketchfab.com/artsmia)
License: CC0-1.0 (http://creativecommons.org/publicdomain/zero/1.0/)
Source: https://sketchfab.com/3d-models/head-of-the-buddha-12th-13th-c-ce-d1963b3475e24071b338b1ca782f4d82
Title: Head of the Buddha, 12th - 13th C CE
*/

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

export function Buddha2(props) {
  const { nodes, materials } = useGLTF("/portfolio/models/Buddha3.glb");

  const { rotation, position, scale } = useControls("Buddha2", {
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
      const rotation = get("Buddha2.rotation");
      const position = get("Buddha2.position");
      const scale = get("Buddha2.scale");
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

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={[scale, scale, scale]}
    >
      <group
        {...props}
        dispose={null}
        // position={[position.x, position.y, position.z]}
        // rotation={[rotation.x, rotation.y, rotation.z]}
        // scale={[scale, scale, scale]}
      >
        <mesh geometry={nodes.buddha.geometry} material={nodes.buddha.material}>
          <LayerMaterial
            transparent
            lighting={"basic"}
            color={"white"}
            alpha={1}
          >
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
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/portfolio/models/Buddha3.glb");