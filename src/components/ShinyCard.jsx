import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { memo, useEffect, useRef } from "react";
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

  const handleMouseMove = (e) => {
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
  };

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        // background: "blue",
        perspective: "1000px",
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <RotationWrapper
        style={{
          rotateX,
          rotateY,
        }}
      >
        <CardWrapper>
          <HoverCard>{children}</HoverCard>
        </CardWrapper>
      </RotationWrapper>
    </div>
  );
});

export default ShinyCard;
