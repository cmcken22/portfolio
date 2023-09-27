import { Html } from "@react-three/drei";
import React, { useRef, useEffect, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";
import state from "./state";
import { animate, useMotionValue } from "framer-motion";
import { MenuContext } from "../contexts/MenuContext";

export const Menu = (props) => {
  const { onSectionChange, domContent } = props;
  const { menuOpened, setMenuOpened } = useContext(MenuContext);

  const ref = useRef();
  const groupPosX = useMotionValue(0);

  useEffect(() => {
    const distance = 50;
    animate(groupPosX, menuOpened ? distance : 0, {
      type: "easeInOut",
    });
  }, [menuOpened]);

  useFrame(() => {
    // const curY = ref.current.position.y;
    // const curTop = state.top.current / aspect;
    // ref.current.position.y = lerp(curY, (curTop / state.zoom) * factor, 0.1);
    // ref.current.position.x = groupPosX.get();
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Html
        fullscreen
        portal={domContent}
        // zIndexRange={[200]}
      >
        <button
          onClick={() => {
            setMenuOpened((prev) => !prev);
          }}
          className="z-20 fixed top-12 right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md absolute"
        >
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "rotate-45  translate-y-0.5" : ""
            }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full my-1 ${
              menuOpened ? "hidden" : ""
            }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "-rotate-45" : ""
            }`}
          />
        </button>
        <div
          className={`z-10 absolute top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
          style={{
            height: "100vh",
            top: "0",
            // marginLeft: "auto",
            // right: "-50vw",
          }}
        >
          <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
            <MenuButton label="About" onClick={() => onSectionChange(0)} />
            <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
            <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
            <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
          </div>
        </div>
      </Html>
    </group>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};
