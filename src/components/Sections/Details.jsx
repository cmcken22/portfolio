import ListItem, { Items } from "@components/ListItem";
import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import { Box, Grid, Typography, styled } from "@mui/material";
import { motion, stagger, useAnimate, useAnimation } from "framer-motion";
import { memo, useEffect, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";

const typingDelay = 2000;
const fontColor = "rgb(148, 163, 184)";

const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "1280px",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),

  [theme.breakpoints.down("md")]: {
    // backgroundColor: red[500],
  },
  [theme.breakpoints.up("md")]: {
    // backgroundColor: blue[500],
  },
  [theme.breakpoints.up("lg")]: {
    // backgroundColor: green[500],
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },
}));

const staggerMenuItems = stagger(0.2, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    return;
    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

const StickyHeader = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <Grid
      item
      xs={6}
      className="GRID_ITEM_1"
      sx={{
        height: "fit-content",
        paddingTop: "6rem",
        position: "sticky",
        top: "0",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: Animation.duration, delay: Animation.delay }}
        // threshold={1}
        onViewportEnter={() => {
          controls.start({ opacity: 1 });
        }}
      >
        <Box
          pt={2}
          sx={{
            width: "100%",
            position: "sticky",
            top: "0",
          }}
        >
          <Typography variant="h1" color={fontColor} fontSize="3rem">
            Conner McKenna
          </Typography>
          <TypeAnimation
            sequence={[
              "Software Engineer",
              typingDelay,
              "Full Stack Developer",
              typingDelay,
              "Frontend Engineer",
              typingDelay,
              "Tech Lead",
              typingDelay,
              "Code Enthusiast",
              typingDelay,
              "Artist",
              typingDelay,
            ]}
            wrapper="span"
            speed={25}
            style={{
              fontSize: "2em",
              display: "inline-block",
              color: fontColor,
            }}
            repeat={Infinity}
          />
          <br />
          <ul>
            <li>
              <a
                href="#about"
                style={{
                  color: fontColor,
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#experience"
                style={{
                  color: fontColor,
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#toolkit"
                style={{
                  color: fontColor,
                }}
              >
                Toolkit
              </a>
            </li>
          </ul>
        </Box>
      </motion.div>
    </Grid>
  );
};

const About = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <motion.div
      id="about"
      className="GRID_ITEM_BOX"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      // threshold={1}
      onViewportEnter={() => {
        controls.start({ opacity: 1 });
      }}
      style={{
        marginTop: "6rem",
      }}
    >
      <Typography id="about" color={fontColor} fontSize="1rem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        quod tempore! Eos sunt a reiciendis veniam ab eum aperiam placeat natus
        dolore soluta autem sequi, doloribus provident. Asperiores, dolore nam?
      </Typography>
    </motion.div>
  );
};

const Experience = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <motion.div
      id="experience"
      className="GRID_ITEM_BOX"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      onViewportEnter={() => {
        controls.start({ opacity: 1 });
      }}
    >
      <ul
        style={{
          pointerEvents: inView ? "auto" : "none",
          paddingTop: "6rem",
        }}
      >
        {Items?.map((item, index) => (
          <ListItem key={`list-item--${index}`} item={item} index={index} />
        ))}
      </ul>
    </motion.div>
  );
};

const Toolkit = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0, x: -500 });
    }
  }, [inView]);

  const tools = useMemo(() => {
    return [
      {
        name: "React",
        icon: "",
      },
      {
        name: "Redux",
        icon: "",
      },
      {
        name: "NodeJS",
        icon: "",
      },
      {
        name: "MongoDB",
        icon: "",
      },
      {
        name: "JavaScript",
        icon: "",
      },
      {
        name: "TypeScript",
        icon: "",
      },
      {
        name: "Sass",
        icon: "",
      },
      {
        name: "Docker",
        icon: "",
      },
      {
        name: "Figma",
        icon: "",
      },
    ];
  }, []);

  return (
    <motion.div
      id="experience"
      className="GRID_ITEM_BOX"
      initial={{ opacity: 0, x: -500 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      threshold={1}
      onViewportEnter={() => {
        controls.start({ opacity: 1, x: 0 });
      }}
    >
      <Box
        sx={{
          // height: "400px",
          width: "100%",
          backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {tools?.map((tool) => (
          <Box
            key={`tool--${tool?.name}`}
            sx={{
              height: "60px",
              width: "106px",
              backgroundColor: "blue",
            }}
          >
            {tool?.name}
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

const Details = memo(() => {
  const inView = useSectionContext((state) => state.activeSection) === "About";
  const controls = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <StyledGrid
      container
      className="GRID_CONTAINER"
      sx={{
        minHeight: "100vh",
      }}
    >
      <StickyHeader />
      <Grid
        item
        xs={6}
        className="GRID_ITEM"
        mb={12}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <About />
        <Experience />
        <Toolkit />
      </Grid>
    </StyledGrid>
  );
});

export default Details;
