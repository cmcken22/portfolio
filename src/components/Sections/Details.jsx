import { Box, Grid, Typography, styled } from "@mui/material";
import { useSectionContext } from "../../App";
import { useState, useEffect, useMemo } from "react";
import { useAnimate, stagger, motion, useAnimation } from "framer-motion";
import ListItem, { Items } from "../ListItem";
import { red, green, blue } from "@mui/material/colors";
import { TypeAnimation } from "react-type-animation";
import { InView } from "react-intersection-observer";

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

const Details = () => {
  const inView = useSectionContext((state) => state.activeSection) === "About";
  const typingDelay = 2000;
  const animationDuration = 0.5;
  const animationDelay = 0.5;
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (!inView) {
      controls1.start({ opacity: 0 });
      controls2.start({ opacity: 0 });
    } else {
      // setKey((prev) => prev + 1);
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
          animate={controls1}
          transition={{ duration: animationDuration, delay: animationDelay }}
          threshold={1}
          onViewportEnter={() => {
            controls1.start({ opacity: 1 });
          }}
          // onViewportLeave={() => {
          //   controls1.start({ opacity: 0 });
          // }}
        >
          <Box
            pt={2}
            sx={{
              width: "100%",
              position: "sticky",
              top: "0",
            }}
          >
            <Typography variant="h1" color="black" fontSize="3rem">
              Conner McKenna
            </Typography>
            {/* <TypeAnimation
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
                color: "black",
              }}
              repeat={Infinity}
            /> */}
            <br />
            <ul>
              <li>
                <a
                  href="#about"
                  style={{
                    color: "black",
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  style={{
                    color: "black",
                  }}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#toolkit"
                  style={{
                    color: "black",
                  }}
                >
                  Toolkit
                </a>
              </li>
            </ul>
          </Box>
        </motion.div>
      </Grid>
      {/* {displayList && ( */}
      <Grid
        item
        xs={6}
        className="GRID_ITEM"
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <motion.div
          // id="about"
          className="GRID_ITEM_BOX"
          initial={{ opacity: 0 }}
          animate={controls2}
          transition={{ duration: animationDuration, delay: animationDelay }}
          threshold={1}
          onViewportEnter={() => {
            controls2.start({ opacity: 1 });
          }}
          // onViewportLeave={() => {
          //   controls2.start({ opacity: 0 });
          // }}
          style={{
            marginTop: "6rem",
            // background: "red",
          }}
        >
          <Typography
            id="about"
            variant="p"
            color="black"
            fontSize="1rem"
            // sx={{
            //   background: "red",
            //   paddingTop: "6rem",
            // }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            quod tempore! Eos sunt a reiciendis veniam ab eum aperiam placeat
            natus dolore soluta autem sequi, doloribus provident. Asperiores,
            dolore nam?
          </Typography>
        </motion.div>

        <motion.div
          id="experience"
          className="GRID_ITEM_BOX"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: animationDuration, delay: animationDelay }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <ul
            style={{
              pointerEvents: inView ? "auto" : "none",
              paddingTop: "6rem",
            }}
          >
            {Items?.map((item, index) => (
              <ListItem
                key={`list-item--${index}`}
                item={item}
                index={index}
                animationDuration={animationDuration}
                animationDelay={animationDelay}
              />
            ))}
          </ul>
        </motion.div>
        <motion.div
          id="test"
          className="GRID_ITEM_BOX"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: animationDuration, delay: animationDelay }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <ul
            style={{
              pointerEvents: inView ? "auto" : "none",
              paddingTop: "6rem",
            }}
          >
            {Items?.map((item, index) => (
              <ListItem
                key={`list-item--${index}`}
                item={item}
                index={index + Items?.length}
                animationDuration={animationDuration}
                animationDelay={animationDelay}
              />
            ))}
          </ul>
        </motion.div>
      </Grid>
      {/* )} */}
    </StyledGrid>
  );
};

export default Details;
