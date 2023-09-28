import { Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../section";
import { TypeAnimation } from "react-type-animation";
import { useThree } from "@react-three/fiber";
import { Box, Card } from "@mui/material";
import { a, useTransition } from "@react-spring/web";
import { useAnimationControls, motion } from "framer-motion";
import useMobile from "../../contexts/useMobile";

const cardStyles = {
  height: "50%",
  width: "100%",
  background: "linear-gradient(-45deg, #f403d1, #64b5f6)",
};

const cards = [
  {
    company: "LockDocs",
    title: "Full Stack Developer",
    date: "2021 - Present",
    front: "linear-gradient(-45deg, #f403d1, #64b5f6)",
    back: "linear-gradient(-45deg, #64b5f6, #f403d1)",
  },
  {
    company: "Opendoor",
    title: "Full Stack Developer",
    date: "2020 - 2021",
    front: "linear-gradient(-45deg, #f321d7, #ffec61)",
    back: "linear-gradient(-45deg, #ffec61, #f321d7)",
  },
  {
    company: "EllisDon",
    title: "Full Stack Developer",
    date: "2019 - 2020",
    front: "linear-gradient(-45deg, #24ff72, #9a4eff)",
    back: "linear-gradient(-45deg, #9a4eff, #24ff72)",
  },
];

function Text({ active }) {
  const ANIMATION_DELAY = 1.5;
  const ANIMATION_DURATION = 1;

  const transition = useTransition(active, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition((style, active) => {
    if (!active) return null;
    return (
      <a.div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        <TypeAnimation
          className="typing-text"
          sequence={[
            "",
            (ANIMATION_DELAY + ANIMATION_DURATION) * 1000,
            // Same substring at the start will only be typed out once, initially
            "Past Experience",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "",
          ]}
          wrapper="span"
          speed={50}
          repeat={0}
          // repeat={Infinity}
        />
      </a.div>
    );
  });
}

function Cards({ active, children }) {
  const wrapperVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { type: "easeIn", delay: 0.1, duration: 1 },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        variants={wrapperVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        exit="exit"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

const Content = ({ inView }) => {
  const [displayText, setDisplayText] = useState(false);
  const [displayCards, setDisplayCards] = useState(false);
  const timer = useRef();
  const timer2 = useRef();
  const { mobile, size } = useMobile();

  useEffect(() => {
    if (inView) {
      setDisplayText(true);
      timer.current = setTimeout(() => {
        setDisplayText(false);
        timer2.current = setTimeout(() => {
          setDisplayCards(true);
        }, 1000);
      }, 5500);
    } else if (timer?.current || timer2.current) {
      clearTimeout(timer?.current);
      timer.current = null;
      clearTimeout(timer2.current);
      timer2.current = null;
      setDisplayText(false);
      setDisplayCards(false);
    }
  }, [inView]);

  if (!inView) return null;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Text active={displayText} />
      {/* {displayCards && ( */}
      <Cards active={displayCards}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            // display: "flex",
            display: "grid",
            gridTemplateColumns: mobile ? "unset" : "repeat(3, 1fr)",
            gridGap: "24px",
            alignItems: "center",
          }}
        >
          {cards?.map((card, i) => {
            const wrapperVariants = {
              hidden: {
                x: 600 * (i + 1),
              },
              visible: {
                x: 0,
                transition: {
                  type: "easeIn",
                  delay: 0.1 * (i + 1),
                  duration: 0.5,
                },
              },
              exit: {
                x: 100 * (i + 1),
                transition: {
                  type: "easeOut",
                  delay: 0.1 * (i + 1),
                  duration: 0.5,
                },
              },
            };
            return (
              <motion.div
                key={card?.company}
                variants={wrapperVariants}
                initial="hidden"
                animate={displayCards ? "visible" : "hidden"}
                exit="exit"
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    ...cardStyles,
                    height: mobile ? "100%" : "50%",
                    background: card?.front,
                    // background: "linear-gradient(-45deg, #64b5f6, #f403d1)",
                  }}
                >
                  {card?.company}:&nbsp;{size?.width}
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </Cards>
      {/* )} */}
    </Box>
  );
};

const PastExperience = ({ domContent, position, bgColor, scrollToPos }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  useEffect(() => {
    const pos = viewport?.factor * viewport?.height * 2;
    if (inView) {
      scrollToPos(pos);
    }
  }, [inView, scrollToPos, viewport?.factor, viewport?.height]);

  const scale = 30;

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} scale={[scale, scale, scale]}>
        <Html fullscreen portal={domContent}>
          <div
            ref={refItem}
            className="container z-20"
            style={{
              margin: 0,
              justifyContent: "unset",
            }}
          >
            <Content inView={inView} />
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default PastExperience;
