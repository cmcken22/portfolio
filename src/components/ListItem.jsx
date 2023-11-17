import { Box, Card, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion, useAnimation } from "framer-motion";
import { red, green, blue } from "@mui/material/colors";
import { TypeAnimation } from "react-type-animation";
import { InView } from "react-intersection-observer";
import { useSectionContext } from "../App";

export const Items = [
  {
    company: "LockDocs Inc.",
    link: "",
    position: "Senior Software Engineer",
    startDate: "FEB 2023",
    endDate: "PRESENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "Opendoor",
    link: "",
    position: "Software Engineer",
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
];

const ListItem = ({ item, index, animationDuration, animationDelay }) => {
  const { startDate, endDate, position, company, description } = item;
  const controls = useAnimation();
  const activeSection = useSectionContext((state) => state.activeSection);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (activeSection !== "About") {
      controls.start({ opacity: 0, x: -500 });
    } else {
      setKey((prev) => prev + 1);
    }
  }, [activeSection]);

  return (
    <motion.div
      className="LIST_ITEM"
      key={`${item?.company}-${key}`}
      initial={{ opacity: 0, x: -500 }}
      // initial={{ opacity: 0 }}
      animate={controls}
      transition={{
        ease: "linear",
        duration: animationDuration,
        delay: animationDelay,
        delay: animationDelay + index * 0.1,
      }}
      threshold={1}
      onViewportEnter={() => {
        setTimeout(() => {
          console.log(item?.company, "enter");
          controls.start({ opacity: 1, x: 0 });
        }, (500 / index) * 0.1);
      }}
      // onViewportLeave={() => {
      //   console.log(item?.company, "leave");
      //   controls.start({ opacity: 0, x: -500 });
      // }}
    >
      {/* <Card
        sx={{
          marginBottom: "8px",
          background: "transparent",
          boxShadow: "none",

          "&:hover": {
            background: "white",
          },
        }}
      > */}
      <li
        style={{
          // background: "red",
          color: "black",
          transformOrigin: "-20px 50%",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="p" color="black" textAlign="left">
              {startDate} - {endDate}
            </Typography>
          </Grid>
          <Grid item xs={8} pl={2}>
            <Typography variant="p" color="black" textAlign="left">
              {company}
            </Typography>
            <Typography variant="p" color="black" textAlign="left">
              {position}
            </Typography>
            <Typography variant="p" color="black" textAlign="left">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </li>
      {/* </Card> */}
    </motion.div>
  );
};

export default ListItem;
