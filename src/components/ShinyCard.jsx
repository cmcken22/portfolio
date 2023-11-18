import useMobile from "@contexts/useMobile";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { memo, useCallback, useEffect, useRef } from "react";
import HoverCard from "./HoverCard";

const Container = styled.div`
  position: relative;
`;

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
`;

const ShinyCard = memo(({ children }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { mobile } = useMobile();

  const rotateX = useTransform(mouseY, (newMouseY) => {
    if (!cardRef.current) return 0;

    const rect = cardRef.current.getBoundingClientRect();
    const percentY = newMouseY / (rect.height / 2);

    // Apply a non-linear transformation to adjust rotation speed
    const transformedY = Math.pow(percentY, 3);

    const maxX = 10;
    const newRotateY = transformedY * maxX;

    return -newRotateY;
  });

  const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!cardRef.current) return 0;

    const rect = cardRef.current.getBoundingClientRect();
    const percentX = newMouseX / (rect.width / 2);

    // Apply a non-linear transformation to adjust rotation speed
    const transformedX = Math.pow(percentX, 3);

    const maxX = 10;
    const newRotateX = transformedX * maxX;

    return newRotateX;
  });

  const handleMouseMove = useCallback((e) => {
    if (mobile) return;
    // Debounce the mouse move event
    if (!handleMouseMove.debounced) {
      handleMouseMove.debounced = true;

      requestAnimationFrame(() => {
        const divRect = cardRef.current.getBoundingClientRect();
        const centerX = divRect.left + divRect.width / 2;
        const centerY = divRect.top + divRect.height / 2;

        const mouseXRelativeToCenter = e.clientX - centerX;
        const mouseYRelativeToCenter = e.clientY - centerY;

        mouseX.set(mouseXRelativeToCenter);
        mouseY.set(mouseYRelativeToCenter);

        handleMouseMove.debounced = false;
      });
    }
  }, []);

  // console.log("mobile:", mobile);

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
      ref={cardRef}
      sx={{
        // background: "blue",
        perspective: "1000px",
        "& .card-wrapper": {
          width: {
            xs: "100%",
            md: "fit-content",
          },
        },
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <RotationWrapper
        style={{
          rotateX: mobile ? 0 : rotateX,
          rotateY: mobile ? 0 : rotateY,
        }}
      >
        <CardWrapper className="card-wrapper">
          <HoverCard>{children}</HoverCard>
        </CardWrapper>
      </RotationWrapper>
    </Box>
  );
});

export default ShinyCard;
