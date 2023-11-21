import useMobile from "@contexts/useMobile";
import styled from "@emotion/styled";
import { Box, styled as muiStyled } from "@mui/material";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const RotationWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled(motion.div)`
  border-radius: 20px;
  backdrop-filter: blur(4px) brightness(120%);
  borderRadius: "0.375rem",
  transitionProperty:
    "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "300ms",
  zIndex: 0,
  "&:hover": {

    backdropFilter: "blur(10px)",
    // backgroundColor: "rgba(30, 41, 59, 0.5)",
    backgroundColor: "red",
    boxShadow:
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
  },
`;

const StyledBox = muiStyled(motion.div, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ zoomDirection, mouseHold }) => ({
  borderRadius: "0.375rem",
  transitionProperty:
    "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "300ms",
  zIndex: 0,
  "&:hover": {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    boxShadow:
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
  },
}));

function getRelativeCoordinates(event, referenceElement) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
  };
}

const ShinyCard = memo(({ active, children }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { small } = useMobile();
  const mouseIdleTimer = useRef(null);
  const mouseIsInside = useRef(false);
  const frame = useRef(0);
  const mouseExitTimer = useRef(null);
  const [hover, setHover] = useState(false);

  const handleExit = useCallback(() => {
    animate(mouseX, 0, { type: "spring", stiffness: 500 });
    animate(mouseY, 0, { type: "spring", stiffness: 500 });
  }, []);

  const rotateX = useTransform(mouseY, (newMouseY) => {
    if (!cardRef.current) return 0;

    const rect = cardRef.current.getBoundingClientRect();
    const percentY = newMouseY / (rect.height / 2);

    const maxX = 10;
    const newRotateY = percentY * maxX;

    return -newRotateY;
  });

  const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!cardRef.current) return 0;

    const rect = cardRef.current.getBoundingClientRect();
    const percentX = newMouseX / (rect.width / 2);

    const maxX = 10;
    const newRotateX = percentX * maxX;

    return newRotateX;
  });

  // sheen
  const diagonalMovement = useTransform(
    [rotateX, rotateY],
    ([newRotateX, newRotateY]) => {
      const position = newRotateX + newRotateY;
      return position;
    }
  );
  const sheenPosition = useTransform(diagonalMovement, [-5, 5], [-100, 200]);
  const sheenOpacity = useTransform(
    sheenPosition,
    [-250, 50, 250],
    [0, 0.05, 0]
  );
  const sheenGradient = useMotionTemplate`linear-gradient(
  55deg,
  transparent,
  rgba(255 255 255 / ${sheenOpacity}) ${sheenPosition}%,
  transparent)`;

  useEffect(() => {
    if (!active) {
      animate(mouseX, 0);
      animate(mouseY, 0);
    }
  }, [active]);

  const handleMouseMove = useCallback(
    (e) => {
      if (small) return;
      // Debounce the mouse move event
      if (!handleMouseMove.debounced) {
        handleMouseMove.debounced = true;

        if (!mouseIsInside?.current) {
          cancelAnimationFrame(frame.current);
          handleMouseMove.debounced = false;
          return;
        }

        frame.current = requestAnimationFrame(() => {
          if (!mouseIsInside?.current) {
            handleExit();
            cancelAnimationFrame(frame.current);
            handleMouseMove.debounced = false;
            return;
          }
          // console.log("__mouseMouve:", blockMouseMovement.current);
          // if (blockMouseMovement.current) {
          //   handleMouseMove.debounced = false;
          //   return;
          // }
          const divRect = cardRef.current.getBoundingClientRect();
          const centerX = divRect.left + divRect.width / 2;
          const centerY = divRect.top + divRect.height / 2;

          const mouseXRelativeToCenter = e.clientX - centerX;
          const mouseYRelativeToCenter = e.clientY - centerY;

          // mouseX.set(mouseXRelativeToCenter);
          // mouseY.set(mouseYRelativeToCenter);
          // console.log("animating");
          // animate(mouseX, mouseXRelativeToCenter, { type: "spring" });
          // animate(mouseY, mouseYRelativeToCenter, { type: "spring" });
          const options = { type: "easeOut", duration: 0.5 };
          animate(mouseX, mouseXRelativeToCenter, options);
          animate(mouseY, mouseYRelativeToCenter, options);

          handleMouseMove.debounced = false;

          // clearTimeout(mouseIdleTimer.current);
          // mouseIdleTimer.current = setTimeout(() => {
          //   animate(mouseX, 0);
          //   animate(mouseY, 0);
          // }, 1000);
        });
      }
    },
    [small, handleExit]
  );

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  return (
    <Box className="shiny-card" sx={{ perspective: "1000px" }}>
      <RotationWrapper
        style={{
          rotateX,
          rotateY,
        }}
      >
        <StyledBox
          ref={cardRef}
          className="card-wrapper"
          style={{
            height: "100%",
            width: "100%",
            minHeight: "100px",
            width: "calc(100% + 32px)",
            margin: "-16px",
            position: "relative",
            left: 0,
            padding: "16px",
            opacity: 1,
            backgroundImage: hover && sheenGradient,
            // "&:hover": {
            // },
            // "&:hover": {
            //   backdropFilter: "blur(10px)",
            //   backgroundColor: "rgba(30, 41, 59, 0.5)",
            //   boxShadow:
            //     "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
            // },
          }}
          onMouseEnter={() => {
            mouseIsInside.current = true;
            clearTimeout(mouseExitTimer.current);
            setHover(true);
          }}
          onMouseLeave={() => {
            clearTimeout(mouseExitTimer.current);
            mouseExitTimer.current = setTimeout(() => {
              mouseIsInside.current = false;
              handleExit();
              setHover(false);
            }, 100);
          }}
        >
          {children}
        </StyledBox>
      </RotationWrapper>
    </Box>
  );
});

export default ShinyCard;
