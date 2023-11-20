import useMobile from "@contexts/useMobile";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { memo, useCallback, useEffect, useRef } from "react";
import HoverCard from "./HoverCard";

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

        requestAnimationFrame(() => {
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
          animate(mouseX, mouseXRelativeToCenter);
          animate(mouseY, mouseYRelativeToCenter);

          handleMouseMove.debounced = false;

          clearTimeout(mouseIdleTimer.current);
          mouseIdleTimer.current = setTimeout(() => {
            animate(mouseX, 0);
            animate(mouseY, 0);
          }, 1000);
        });
      }
    },
    [small]
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
      ref={cardRef}
      sx={{
        margin: {
          xs: 0,
          md: "-1.5rem",
        },
        padding: {
          xs: 0,
          md: "1.5rem",
        },
        perspective: "1000px",
        // backgroundColor: "blue",
        "& .card-wrapper": {
          width: {
            xs: "100%",
            md: "fit-content",
          },
        },
        position: "relative",
        "&:hover": {
          "& > .box-shadow": {
            opacity: "1 !important",
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
          rotateX: small ? 0 : rotateX,
          rotateY: small ? 0 : rotateY,
        }}
      >
        <Box
          className="card-wrapper"
          component={motion.div}
          sx={{
            borderRadius: "20px",
            backdropFilter: {
              md: "blur(4px) brightness(120%)",
            },
          }}
        >
          <HoverCard disabled={!active}>{children}</HoverCard>
        </Box>
      </RotationWrapper>
    </Box>
  );
});

export default ShinyCard;
