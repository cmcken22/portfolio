/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Faces.glb 
Author: T.Koeniger (https://sketchfab.com/3D-hannover)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/buddha-four-faces-18405445c05e48fabbc915d69ae2ccc2
Title: Buddha - Four Faces
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

export function Faces(props) {
  const { nodes, materials } = useGLTF("/portfolio/models/Faces.glb");

  const group = React.useRef();
  const { viewport } = useThree();
  const count = React.useRef(0);
  // console.log("x:", x);

  // const { layers, materialProps } = useBuddhaMaterials();
  // console.log("layers:", layers);
  const { rotation, position, scale } = useControls("FACE", {
    // rotation: {
    //   x: -0.35,
    //   y: 0.31,
    //   z: 0.16,
    // },
    // position: {
    //   x: 0,
    //   y: -viewport?.height / 4,
    //   z: 1,
    // },
    // scale: 14,
    rotation: {
      x: 0.46,
      y: 1.68,
      z: 0.04,
    },
    position: {
      x: 1.44,
      y: 0.01,
      z: 0.86,
    },
    scale: 0.3,
    Add: button((get) => {
      console.clear();
      const rotation = get("FACE.rotation");
      const position = get("FACE.position");
      const scale = get("FACE.scale");
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
    <group ref={group} {...props} dispose={null}>
      <group
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale, scale, scale]}
      >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        >
          <M />
        </mesh>
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
        >
          <M />
        </mesh>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
        >
          <M />
        </mesh>
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        >
          <M />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/portfolio/models/Faces.glb");