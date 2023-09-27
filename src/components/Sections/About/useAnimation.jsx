import { useCallback, useEffect, useRef } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";

// create a new RGBELoader to import the HDR
const hdrEquirect = new RGBELoader()
  // add your HDR //
  .setPath(
    "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
  )
  .load("ml_gradient_freebie_01.hdr", function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
  });

var scene = new THREE.Scene();
scene.environment = hdrEquirect;
scene.fog = new THREE.FogExp2(0x11151c, 0.15);

// create a group to add your camera and object
// by creating a group, you can can work around the fact that three.js currently doesn't allow to add a rotation to the HDR
// when you add the camera and the object to the group, you can later animate the entire group
// you can then create a scene within the group, but then rotate the entire group, which simulates the rotation of the HDR
var group = new THREE.Group();
scene.add(group);

const pointlight = new THREE.PointLight(0x85ccb8, 7.5, 20);
pointlight.position.set(0, 3, 2);
group.add(pointlight);

const pointlight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
pointlight2.position.set(0, 3, 2);
group.add(pointlight2);

const useAnimation = (visible) => {
  const renderer = useRef(null);
  const camera = useRef(null);
  const theta1 = useRef(0);
  const initialized = useRef(false);
  const allowAnimate = useRef(visible);

  useEffect(() => {
    allowAnimate.current = visible;
  }, [visible]);

  const update = useCallback(() => {
    // Continuously animate theta1 irrespective of scrolling to ensure there's an inherent animation in the 3D visualization.
    theta1.current += 0.0025;

    // create a panning animation for the camera
    camera.current.position.x = Math.sin(theta1.current) * 10;
    camera.current.position.z = Math.cos(theta1.current) * 10;
    camera.current.position.y = Math.cos(theta1.current);

    pointlight.position.x = Math.sin(theta1.current + 1) * 11;
    pointlight.position.z = Math.cos(theta1.current + 1) * 11;
    pointlight.position.y = 2 * Math.cos(theta1.current - 3) + 3;

    pointlight2.position.x = -Math.sin(theta1.current + 1) * 11;
    pointlight2.position.z = -Math.cos(theta1.current + 1) * 11;
    pointlight2.position.y = 2 * -Math.cos(theta1.current - 3) - 6;

    // rotate the group to simulate the rotation of the HDR
    group.rotation.y += 0.01;

    // keep the camera look at 0,0,0
    camera.current.lookAt(0, 0, 0);
  }, []);

  const animate = useCallback(() => {
    if (!allowAnimate?.current) return;
    update();
    renderer.current.render(scene, camera.current);
    requestAnimationFrame(animate);
  }, []);

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
    group.add(camera.current);

    const material1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.5,
      envMapIntensity: 10,
    });

    // Load the model
    const objloader = new OBJLoader();
    objloader.load(
      // "https://raw.githubusercontent.com/miroleon/peace-of-mind/main/assets/buddha.obj",
      "/portfolio/models/craneo.OBJ",
      (object) => {
        object.children[0].material = material1;
        object.scale.setScalar(2);
        object.position.set(0, 0.25, 0);
        group.add(object);
      }
    );
    animate();
  }, []);

  useEffect(() => {
    initScene();
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    if (visible) {
      animate();
    }
  }, [visible]);
};

export default useAnimation;
