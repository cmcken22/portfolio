import { Box, Chip, Grid, Typography } from "@mui/material";
import { Sections } from "constants";
import useSectionContext from "contexts/SectionContext";
import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

export const Items = [
  {
    company: "LockDocs Inc.",
    link: "",
    position: "Senior Software Engineer",
    startDate: "FEB 2023",
    endDate: "PRESENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["React", "Firebase", "NodeJS", "NestJS", "Docker"],
  },
  {
    company: "Opendoor",
    link: "",
    position: "Software Engineer",
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["React", "React Native", "NextJS", "NodeJS", "Express"],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["React", "NodeJS", "Express", "Micro Services", "Redis", "GCP"],
  },
  // {
  //   company: "EllisDon",
  //   link: "",
  //   position: "Software Engineer",
  //   startDate: "JUL 2017",
  //   endDate: "AUG 2023",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   tags: [],
  // },
  // {
  //   company: "EllisDon",
  //   link: "",
  //   position: "Software Engineer",
  //   startDate: "JUL 2017",
  //   endDate: "AUG 2023",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   tags: [],
  // },
];

const ListItem = memo(({ item, index, animationDuration, animationDelay }) => {
  const { startDate, endDate, position, company, description, tags } = item;
  const controls = useAnimation();
  const { activeSection } = useSectionContext();
  const [key, setKey] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (activeSection !== Sections.Details) {
      controls.start({ opacity: 0, x: -500 });
      // controls.start({ opacity: 0 });
    } else {
      // setKey((prev) => prev + 1);
    }
  }, [activeSection]);

  const fontColor = "rgb(148, 163, 184)";
  // const fontColor = "black";

  return (
    <motion.div
      // className="LIST_ITEM"
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
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          console.log(item?.company, "enter");
          controls.start({ opacity: 1, x: 0 });
        }, (500 / index) * 0.1);
      }}
      style={{
        willChange: "opacity, transform",
      }}
    >
      <Box
        sx={{
          position: "relative",
          color: "black",
          transformOrigin: "-20px 50%",
          marginBottom: "48px",
          "&:hover": {
            "& > .box-shadow": {
              opacity: 1,
            },
          },
        }}
      >
        <Box
          className="box-shadow"
          sx={{
            opacity: 0,
            borderRadius: "0.375rem",
            transitionProperty:
              "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "300ms",
            zIndex: 0,
            height: "calc(100% + 32px)",
            width: "calc(100% + 32px)",
            position: "absolute",
            top: "-16px",
            left: "-16px",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(148, 163, 184, 0.1) 0px 1px 0px 0px inset",
          }}
        />
        <li
          className="LIST_ITEM"
          style={{
            position: "relative",
            zIndex: 1,
            // backgroundColor: "rgba(0, 255, 255, 0.2)",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="p" color={fontColor} textAlign="left">
                {startDate} - {endDate}
              </Typography>
            </Grid>
            <Grid item xs={8} pl={2}>
              <Typography variant="p" color={fontColor} textAlign="left">
                {company}
              </Typography>
              <Typography variant="p" color={fontColor} textAlign="left">
                {position}
              </Typography>
              <Typography variant="p" color={fontColor} textAlign="left">
                {description}
              </Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {tags?.map((tag) => (
                  <Chip
                    label={tag}
                    variant="contained"
                    sx={{
                      marginRight: "8px",
                      marginTop: "8px",
                      background: "rgba(45, 212, 191, 0.1)",
                      color: "rgb(94, 234, 212)",
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </li>
      </Box>
    </motion.div>
  );
});

export default ListItem;
