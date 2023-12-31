import { loadingContext } from "contexts/LoadingContext";
import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
// import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
// import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";
// import * as THREE from "three";

const FPS = 60;

class SkullAnimation {
  scene = null;
  group = null;
  pointlight = null;
  pointlight2 = null;
  renderer = null;
  camera = null;
  theta1 = 0;
  object = null;
  animationFrame = null;
  timer = null;
  counter = 0;
  state = "PAUSED";
  position = 0;
  scalar = 1.5;
  windowHeight = window.innerHeight;
  startTime = null;
  allowRotation = false;

  constructor(position = 0, scalar = 1.5) {
    this.addComponents();
    this.initScene();
    this.state = "PLAYING";
    this.position = position;
    this.scalar = scalar;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // this.windowHeight = windowHeight;
    // console.log("windowHeight:", windowHeight);
    // debugger;
    // alert("windowHeight:" + windowHeight);
  }

  setScalar = (scalar) => {
    this.scalar = scalar;
    if (!this.object) return;
    this.object.scale.setScalar(this.scalar);
    this.render();
  };

  setPosition = (position) => {
    this.position = position;
    if (!this.object) return;
    this.object.position.set(0, this.position, 0);
    this.render();
  };

  setWindowHeight = (windowHeight) => {
    this.windowHeight = windowHeight;
    console.log("camera:", this.camera);
    if (!this.camera) return;
    this.camera.aspect = window.innerWidth / this.windowHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, this.windowHeight);
    console.log("done!");
    this.render();
  };

  setAllowRotation = (allowRotation) => {
    this.allowRotation = allowRotation;
  };

  addComponents = () => {
    console.log("xxx addComponents");
    // create a new RGBELoader to import the HDR
    const hdrEquirect = new RGBELoader()
      .setPath(
        "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
      )
      .load("ml_gradient_freebie_01.hdr", function () {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    this.scene = new THREE.Scene();
    this.scene.environment = hdrEquirect;
    this.scene.fog = new THREE.FogExp2(0x11151c, 0.15);

    // create a group to add your camera and object
    // by creating a group, you can can work around the fact that three.js currently doesn't allow to add a rotation to the HDR
    // when you add the camera and the object to the group, you can later animate the entire group
    // you can then create a scene within the group, but then rotate the entire group, which simulates the rotation of the HDR
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.pointlight = new THREE.PointLight(0x85ccb8, 7.5, 20);
    this.pointlight.position.set(0, 3, 2);
    this.group.add(this.pointlight);

    this.pointlight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
    this.pointlight2.position.set(0, 3, 2);
    this.group.add(this.pointlight2);
  };

  update = (deltaTime) => {
    if (!this.allowRotation) return;
    // Adjust the movement increment based on the elapsed time (deltaTime)
    // const movementIncrement = 0.15 * deltaTime;
    const movementIncrement = 0.0025;
    // console.log("movementIncrement:", movementIncrement);

    // increment theta to rotate the lights
    this.theta1 += movementIncrement;

    // create a panning animation for the camera
    this.camera.position.x = Math.sin(this.theta1) * 10;
    this.camera.position.z = Math.cos(this.theta1) * 10;
    this.camera.position.y = Math.cos(this.theta1);

    this.pointlight.position.x = Math.sin(this.theta1 + 1) * 11;
    this.pointlight.position.z = Math.cos(this.theta1 + 1) * 11;
    this.pointlight.position.y = 2 * Math.cos(this.theta1 - 3) + 3;

    this.pointlight2.position.x = -Math.sin(this.theta1 + 1) * 11;
    this.pointlight2.position.z = -Math.cos(this.theta1 + 1) * 11;
    this.pointlight2.position.y = 2 * -Math.cos(this.theta1 - 3) - 6;

    // rotate the group to simulate the rotation of the HDR
    this.group.rotation.y += 0.05;

    // keep the camera look at 0,0,0
    this.camera.lookAt(0, 0, 0);
  };

  render = () => {
    if (this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  animate = (timestamp) => {
    if (this.state === "PAUSED") return;

    if (!this.startTime) this.startTime = timestamp;
    const elapsed = timestamp - this.startTime;

    if (
      this.width !== window.innerWidth ||
      this.height !== window.innerHeight
    ) {
      this.resize();
    }

    this.counter++;
    // console.log("elapsed:", elapsed);
    this.update(elapsed / 1000); // Pass elapsed time in seconds
    this.render();

    // Calculate the time to wait until the next frame
    // const delay = 1000 / FPS - (elapsed % (1000 / FPS));

    // Schedule the next frame
    // setTimeout(() => {
    this.animationFrame = requestAnimationFrame(this.animate);
    this.startTime = timestamp;
    // }, delay);

    const loadingState = loadingContext.getState();
    if (loadingState.loading === true) {
      loadingContext.getState().incrementProgress(2);
    }
  };

  resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.dispose();
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  };

  initScene = () => {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas"),
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);

    // create the camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    // add the camera to the group
    this.group.add(this.camera);

    const material1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.5,
      envMapIntensity: 10,
    });

    // Load the model
    const objloader = new OBJLoader();
    objloader.load("/models/craneo.OBJ", (obj) => {
      console.log("xxx OBJECT LOADED");
      this.object = obj;
      this.object.children[0].material = material1;
      this.object.scale.setScalar(this.scalar);
      this.object.position.set(0, this.position, 0);
      this.group.add(this.object);
      setTimeout(() => {
        requestAnimationFrame(this.animate);
      });
    });
  };

  pause = () => {
    this.renderer.dispose();
    this.state = "PAUSED";
    cancelAnimationFrame(this.animationFrame);
    clearTimeout(this.timer);
  };

  resume = () => {
    this.state = "PLAYING";
    this.timer = setTimeout(() => {
      this.animationFrame = requestAnimationFrame(this.animate);
    }, 1000 / FPS);
  };

  destroy = () => {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene?.children[0]);
    }
    this.scene = null;
    this.group = null;
    this.pointlight = null;
    this.pointlight2 = null;
    this.renderer = null;
    this.camera = null;
    this.theta1 = 0;
    this.object = null;
    this.animationFrame = null;
    this.timer = null;
    this.counter = 0;
    this.state = "PAUSED";
    this.position = 0;
    this.scalar = 1.5;
    this.startTime = null;
    this.allowRotation = false;
  };
}

export default SkullAnimation;
