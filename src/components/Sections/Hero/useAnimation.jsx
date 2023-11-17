import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";
import { useCallback, useEffect, useRef } from "react";
import useLoadingContext from "../../../contexts/LoadingContext";

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

const FPS = 60;

const useAnimation = (visible, mobile) => {
  // scene refs
  const renderer = useRef(null);
  const camera = useRef(null);
  const theta1 = useRef(0);
  const object = useRef(null);
  const scene = useRef();
  const group = useRef();
  const pointlight = useRef();
  const pointlight2 = useRef();
  // scene refs end

  const initialized = useRef(false);
  const allowAnimate = useRef(visible);
  const animationFrame = useRef(null);
  const timer = useRef(null);
  const count = useRef(0);

  const { loading, incrementProgress } = useLoadingContext();

  useEffect(() => {
    // only do this once, after the component is initialized
    // we do not need to do this every time the component re-renders
    if (initialized.current) return;

    // create a new RGBELoader to import the HDR
    const hdrEquirect = new RGBELoader()
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
    if (!visible) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      allowAnimate.current = false;
      cancelAnimationFrame(animationFrame.current);
    }
    if (visible) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(() => {
        allowAnimate.current = true;
        animate("useEffect - test");
      }, 500);
    }
  }, [visible]);

  const update = useCallback((x) => {
    if (!initialized.current) return;
    if (!allowAnimate.current) return;

    // increment theta to rotate the lights
    // this creates a cool effect on the material of the object
    theta1.current += 0.0025;

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
      if (!allowAnimate?.current) return;
      update(x);
      renderer.current.render(scene.current, camera.current);

      setTimeout(() => {
        animationFrame.current = requestAnimationFrame(() => animate(x));
      }, 1000 / FPS);

      if (loading === true) {
        if (count.current < 5) {
          incrementProgress(20);
        }
      }
      count.current++;
    },
    [update, loading, incrementProgress]
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

    // Load the model
    const objloader = new OBJLoader();
    objloader.load("/portfolio/models/craneo.OBJ", (obj) => {
      object.current = obj;
      object.current.children[0].material = material1;
      object.current.scale.setScalar(mobile ? 1.25 : 2);
      object.current.position.set(0, 0.25, 0);
      group.current.add(object.current);
    });

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
    if (visible && object.current) {
      object.current.scale.setScalar(mobile ? 1.25 : 2);
    }
  }, [mobile, visible]);
};

export default useAnimation;
