import { memo } from "react";
import Div100vh from "react-div-100vh";

const AlignmentDiv = memo(() => {
  return (
    <Div100vh
      style={{
        top: "0px",
        position: "fixed",
        background: "rgba(255, 0, 255, 0.4)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4000,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(255, 0, 255, 0.4)",
          height: "100px",
          width: "100%",
        }}
      />
    </Div100vh>
  );
});

export default AlignmentDiv;
