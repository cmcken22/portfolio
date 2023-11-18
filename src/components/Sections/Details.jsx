import ListItem, { Items } from "@components/ListItem";
import Toolkit from "@components/Toolkit";
import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import { useBreakPoint } from "@contexts/useMobile";
import { Box, Grid, Typography, styled } from "@mui/material";
import { motion, stagger, useAnimate, useAnimation } from "framer-motion";
import debounce from "lodash.debounce";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const typingDelay = 2000;
const fontColor = "rgb(148, 163, 184)";

const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "1280px",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),

  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },

  // [theme.breakpoints.down("sm")]: {
  //   backgroundColor: "red",
  // },
  // [theme.breakpoints.down("md")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
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
  const [activeSection, setActiveSection] = useState("about");
  const scrollElm = useRef(null);

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  const handleScroll = useCallback(() => {
    const elm1 = document.getElementById("about");
    const elm2 = document.getElementById("experience");
    const elm3 = document.getElementById("toolkit");
    const elms = [elm1, elm2, elm3];

    // detect closest element to top of the scroll container
    let closest = null;
    let closestDistance = Infinity;
    elms.forEach((elm) => {
      if (elm) {
        const distance = Math.abs(elm.getBoundingClientRect().top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = elm;
        }
      }
    });

    // set active section
    if (closest) {
      const id = closest.id;
      setActiveSection(id);
    }
  }, [setActiveSection]);

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    scrollElm.current = document.querySelector(".__container");
    if (scrollElm.current) {
      scrollElm.current.addEventListener("scroll", debouncedHandleScroll);
    }
    return () => {
      if (scrollElm.current) {
        scrollElm.current.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [debouncedHandleScroll]);

  return (
    <Grid
      item
      xs={12}
      md={6}
      className="GRID_ITEM_1"
      sx={{
        height: "fit-content",
        position: {
          md: "sticky",
        },
        top: "0",
        paddingTop: {
          xs: 10,
          md: 12,
        },
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
                  fontWeight: activeSection === "about" ? "bold" : "normal",
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
                  fontWeight:
                    activeSection === "experience" ? "bold" : "normal",
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
                  fontWeight: activeSection === "toolkit" ? "bold" : "normal",
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
      controls.start({ opacity: 0 }, { duration: 0 });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [inView]);

  return (
    <Box
      id="about"
      className="GRID_ITEM_BOX"
      component={motion.div}
      initial={{ opacity: 1 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      onViewportEnter={() => {}}
      sx={{
        paddingTop: {
          xs: 10,
          md: 12,
        },
      }}
    >
      <Typography id="about" color={fontColor} fontSize="1rem" width="100%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        quod tempore! Eos sunt a reiciendis veniam ab eum aperiam placeat natus
        dolore soluta autem sequi, doloribus provident. Asperiores, dolore nam?
      </Typography>
    </Box>
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

const Details = memo(() => {
  const inView = useSectionContext((state) => state.activeSection) === "About";
  const controls = useAnimation();
  const bp = useBreakPoint();
  console.log("bp:", bp);

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
        xs={12}
        md={6}
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
        <br />
        <br />
        <br />
        <Toolkit />
      </Grid>
    </StyledGrid>
  );
});

export default Details;
