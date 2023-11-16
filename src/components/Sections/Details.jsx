import { Box, Grid, Typography, styled } from "@mui/material";
import { useSectionContext } from "../../App";
import { useState, useEffect } from "react";
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
  const scope = useMenuAnimation(inView);
  const typingDelay = 2000;

  return (
    <StyledGrid container className="GRID_CONTAINER">
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
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <Box
            pt={2}
            sx={{
              width: "100%",
              // background: "red",
              position: "sticky",
              top: "0",
            }}
          >
            <Typography variant="h1" color="black" fontSize="3rem">
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
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </Box>
        </motion.div>
      </Grid>
      <Grid
        item
        xs={6}
        className="GRID_ITEM"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <motion.div
          ref={scope}
          className="GRID_ITEM_BOX"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
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
              <ListItem key={`list-item--${index}`} item={item} index={index} />
            ))}
          </ul>
        </motion.div>
      </Grid>
    </StyledGrid>
  );
};

export default Details;
