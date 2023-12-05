import styled from "@emotion/styled";
import { Box } from "@mui/material";
import useMobile from "contexts/useMobile";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import HoverCard from "./HoverCard";

const RotationWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShinyCard = memo(({ active, px, children }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { small } = useMobile();
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
  const sheenPosition = useTransform(diagonalMovement, [-20, 20], [-100, 200]);
  const sheenOpacity = useTransform(
    sheenPosition,
    [-100, 150, 200],
    [0, 0.1, 0]
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
          const divRect = cardRef.current.getBoundingClientRect();
          const centerX = divRect.left + divRect.width / 2;
          const centerY = divRect.top + divRect.height / 2;

          const mouseXRelativeToCenter = e.clientX - centerX;
          const mouseYRelativeToCenter = e.clientY - centerY;

          const options = { type: "easeOut", duration: 0.5 };
          animate(mouseX, mouseXRelativeToCenter, options);
          animate(mouseY, mouseYRelativeToCenter, options);

          handleMouseMove.debounced = false;
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
    <Box
      className="shiny-card"
      sx={{
        perspective: "1000px",
        position: "relative",
        width: "calc(100% + 32px)",
      }}
    >
      <RotationWrapper
        style={{
          rotateX,
          rotateY,
        }}
      >
        <HoverCard
          className="card-wrapper"
          ref={cardRef}
          px={px}
          style={{
            backgroundImage: hover && sheenGradient,
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
        </HoverCard>
      </RotationWrapper>
    </Box>
  );
});

export default ShinyCard;
