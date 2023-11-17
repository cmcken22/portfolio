import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";
// import { OBJExporter } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJExporter.js";
import { useThree } from "@react-three/fiber";
import { LoadingContext } from "../../../contexts/LoadingContext";
import useLoading from "../../../contexts/useLoading";
import useScrolling from "../../../contexts/useScrolling";
import { OBJExporter } from "three/addons/exporters/OBJExporter.js";
import { saveAs } from "file-saver";
import SplineLoader from "@splinetool/loader";

// create a new RGBELoader to import the HDR
// const hdrEquirect = new RGBELoader()
//   // add your HDR //
//   .setPath(
//     "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
//   )
//   .load("ml_gradient_freebie_01.hdr", function () {
//     hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
//   });

// var scene = new THREE.Scene();
// scene.environment = hdrEquirect;
// scene.fog = new THREE.FogExp2(0x11151c, 0.15);

// // create a group to add your camera and object
// // by creating a group, you can can work around the fact that three.js currently doesn't allow to add a rotation to the HDR
// // when you add the camera and the object to the group, you can later animate the entire group
// // you can then create a scene within the group, but then rotate the entire group, which simulates the rotation of the HDR
// var group = new THREE.Group();
// scene.add(group);

// const pointlight = new THREE.PointLight(0x85ccb8, 7.5, 20);
// pointlight.position.set(0, 3, 2);
// group.add(pointlight);

// const pointlight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
// pointlight2.position.set(0, 3, 2);
// group.add(pointlight2);

const useAnimation = (visible, mobile) => {
  const renderer = useRef(null);
  const camera = useRef(null);
  const theta1 = useRef(0);
  const initialized = useRef(false);
  const allowAnimate = useRef(visible);
  const object = useRef(null);
  const animationFrame = useRef(null);
  const timer = useRef(null);
  const count = useRef(0);
  const { loadingRefs, setLoading } = useLoading();
  const { scrolling } = useScrolling();
  // console.clear();
  // console.log("LoadingContext:", LoadingContext);
  // const { loadingRefs, setLoading } = useContext(LoadingContext);

  console.log("scrolling:", scrolling);
  const scene = useRef();
  const group = useRef();
  const pointlight = useRef();
  const pointlight2 = useRef();

  useEffect(() => {
    // create a new RGBELoader to import the HDR
    const hdrEquirect = new RGBELoader()
      // add your HDR //
      .setPath(
        "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
      )
      .load("ml_gradient_freebie_01.hdr", function () {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    scene.current = new THREE.Scene();
    scene.current.environment = hdrEquirect;
    scene.current.fog = new THREE.FogExp2(0x11151c, 0.15);

    // create a group to add your camera and object
    // by creating a group, you can can work around the fact that three.js currently doesn't allow to add a rotation to the HDR
    // when you add the camera and the object to the group, you can later animate the entire group
    // you can then create a scene within the group, but then rotate the entire group, which simulates the rotation of the HDR
    group.current = new THREE.Group();
    scene.current.add(group.current);

    pointlight.current = new THREE.PointLight(0x85ccb8, 7.5, 20);
    pointlight.current.position.set(0, 3, 2);
    group.current.add(pointlight.current);

    pointlight2.current = new THREE.PointLight(0x9f85cc, 7.5, 20);
    pointlight2.current.position.set(0, 3, 2);
    group.current.add(pointlight2.current);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    // console.log("\n-------------");
    // console.log("visible:", visible);

    if (!visible || scrolling) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      allowAnimate.current = false;
      // console.log("------------");
      // console.log("SETTING TO FALSE:", allowAnimate?.current);
      // console.log("animationFrame.current:", animationFrame.current);
      // console.log("------------");
      cancelAnimationFrame(animationFrame.current);
    }
    if (visible && !scrolling) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(() => {
        // console.log("\n\n------------");
        // console.log("SETTING TO TRUE:", allowAnimate?.current);
        // console.log("------------");
        allowAnimate.current = true;
        animate("useEffect - test");
      }, 1000);
    }
  }, [visible, scrolling]);

  const update = useCallback((x) => {
    if (!allowAnimate.current) return;
    // console.log("updating", x);
    // Continuously animate theta1 irrespective of scrolling to ensure there's an inherent animation in the 3D visualization.
    theta1.current += 0.0025;

    // create a panning animation for the camera
    camera.current.position.x = Math.sin(theta1.current) * 10;
    camera.current.position.z = Math.cos(theta1.current) * 10;
    camera.current.position.y = Math.cos(theta1.current);

    pointlight.current.position.x = Math.sin(theta1.current + 1) * 11;
    pointlight.current.position.z = Math.cos(theta1.current + 1) * 11;
    pointlight.current.position.y = 2 * Math.cos(theta1.current - 3) + 3;

    pointlight2.current.position.x = -Math.sin(theta1.current + 1) * 11;
    pointlight2.current.position.z = -Math.cos(theta1.current + 1) * 11;
    pointlight2.current.position.y = 2 * -Math.cos(theta1.current - 3) - 6;

    // rotate the group to simulate the rotation of the HDR
    group.current.rotation.y += 0.05;

    // keep the camera look at 0,0,0
    camera.current.lookAt(0, 0, 0);
  }, []);

  const animate = useCallback(
    (x) => {
      console.log("ANIMATE___", x);
      if (!allowAnimate?.current) return;
      update(x);
      renderer.current.render(scene.current, camera.current);
      // animationFrame.current = requestAnimationFrame(() => animate(x));

      setTimeout(() => {
        animationFrame.current = requestAnimationFrame(() => animate(x));
        // requestAnimationFrame(animate);
      }, 1000 / 25);
      if (loadingRefs?.About === true && setLoading && count.current >= 5) {
        setLoading("About", false);
      }
      count.current++;
    },
    [update]
  );

  const initScene = useCallback(() => {
    renderer.current = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas"),
      antialias: true,
      alpha: true,
    });

    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(window.innerWidth, window.innerHeight);

    // create the camera
    camera.current = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 10;
    // add the camera to the group
    group.current.add(camera.current);

    const material1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.5,
      envMapIntensity: 10,
    });

    console.log("material1:", material1);

    // Load the model
    const objloader = new OBJLoader();
    objloader.load(
      // "https://raw.githubusercontent.com/miroleon/peace-of-mind/main/assets/buddha.obj",
      "/portfolio/models/craneo.OBJ",
      (obj) => {
        object.current = obj;
        object.current.children[0].material = material1;
        object.current.scale.setScalar(mobile ? 1.25 : 2);
        object.current.position.set(0, 0.25, 0);
        group.current.add(object.current);
      }
    );

    // setTimeout(() => {
    //   console.clear();
    //   try {
    //     const exporter = new OBJExporter();
    //     const test = exporter.parse(scene);
    //     console.log("test:", test);
    //     saveAs(test, `test.obj`);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }, 5000);
    // debugger;

    // renderer.current.render(scene, camera.current);

    if (visible) {
      animate("initScene");
    }
  }, [visible, mobile, animate]);

  useEffect(() => {
    if (initialized.current) return;
    initScene();
    initialized.current = true;
  }, [initScene]);

  useEffect(() => {
    if (!initialized.current) return;
    if (visible) {
      // animate("useEffect - visible");
    }
  }, [visible, animate]);

  useEffect(() => {
    if (!initialized.current) return;
    if (visible && object.current) {
      object.current.scale.setScalar(mobile ? 1.25 : 2);
    }
  }, [mobile, visible]);
};

export default useAnimation;
