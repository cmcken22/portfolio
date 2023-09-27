import { Environment, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Gradient, LayerMaterial } from "lamina";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
// import ml_gradient_01 from "/portfolio/hdrs/ml_gradient_01.hdr";

export const Background = () => {
  const backgroundColors = useRef({
    // colorA: "#3535cc",
    // colorB: "#abaadd",
    colorA: "#ff00d4",
    colorB: "#00ddff",
  });

  const start = 0.2;
  const end = -0.5;

  const gradientRef = useRef();
  const gradientEnvRef = useRef();

  useFrame(() => {
    if (!gradientRef.current) return;
    gradientRef.current.colorA = new THREE.Color(
      backgroundColors.current.colorA
    );
    gradientRef.current.colorB = new THREE.Color(
      backgroundColors.current.colorB
    );
    gradientEnvRef.current.colorA = new THREE.Color(
      backgroundColors.current.colorA
    );
    gradientEnvRef.current.colorB = new THREE.Color(
      backgroundColors.current.colorB
    );
  });

  // 8 (env: -5),
  // // 11,
  // 16 (r: 0.30, env: 128, m: 0.5),
  // 25 (m: -4.5)
  const { idx } = useControls("Background", { idx: 8 });

  // return null;

  return (
    <Environment
      files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
      // files="https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/ml_gradient_freebie_01.hdr"
      // files={`/portfolio/hdrs/ml_gradient_${idx < 10 ? `0${idx}` : idx}.hdr`}
      // files={`/hdrs/ml_gradient_0${idx}.hdr`}
      // files={ml_gradient_01}
      // background
      // blur={0.5}
    />
  );

  // return (
  //   <>
  //     {/* <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
  //       <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
  //         <Gradient ref={gradientRef} axes={"y"} start={start} end={end} />
  //       </LayerMaterial>
  //     </Sphere> */}
  //     {/* <Environment resolution={256} frames={Infinity}>
  //       <Sphere
  //         scale={[100, 100, 100]}
  //         rotation-y={Math.PI / 2}
  //         rotation-x={Math.PI}
  //       >
  //         <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
  //           <Gradient ref={gradientEnvRef} axes={"y"} start={start} end={end} />
  //         </LayerMaterial>
  //       </Sphere>
  //     </Environment> */}
  //   </>
  // );
};
