import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import useMobile from "@contexts/useMobile";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useMemo, useRef } from "react";
import ShinyCard from "./ShinyCard";

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

const ListItem = memo(({ item, index }) => {
  const { startDate, endDate, position, company, description, tags } = item;
  const controls = useAnimation();
  const { activeSection } = useSectionContext();
  const timer = useRef(null);
  const { mobile } = useMobile();

  const activeState = useMemo(() => {
    return { opacity: 1, x: 0 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0, x: -500 };
  }, []);

  useEffect(() => {
    if (activeSection !== Sections.Details) {
      controls.start(exitState, { duration: 0 });
    }
  }, [activeSection, exitState]);

  useEffect(() => {
    console.log("activeSection:", activeSection, mobile);
    if (activeSection === Sections.Details && mobile) {
      controls.start(activeState, { duration: 0 });
    }
  }, [activeSection, mobile]);

  const fontColor = "rgb(148, 163, 184)";

  return (
    <motion.div
      key={`${item?.company}--${item?.position}`}
      initial={{ opacity: 0, x: -500 }}
      animate={controls}
      transition={{
        ease: "linear",
        duration: Animation.duration,
        delay: Animation.delay + index * 0.1,
      }}
      onViewportEnter={() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          controls.start(activeState);
        }, (500 / index) * 0.1);
      }}
      style={{
        willChange: "opacity, transform",
        marginBottom: "6rem",
      }}
    >
      <ShinyCard>
        <li className="LIST_ITEM">
          <Grid container>
            <Grid item xs={3} md={4}>
              <Typography color={fontColor} textAlign="left">
                {startDate} - {endDate}
              </Typography>
            </Grid>
            <Grid item xs={9} md={8} pl={2}>
              <Typography color={fontColor} textAlign="left" width="100%">
                {company}
              </Typography>
              <Typography color={fontColor} textAlign="left" width="100%">
                {position}
              </Typography>
              <Typography color={fontColor} textAlign="left" width="100%">
                {description}
              </Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {tags?.map((tag) => (
                  <Chip
                    key={`tag--${tag}`}
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
      </ShinyCard>
      {/* </HoverCard> */}
    </motion.div>
  );
});

export default ListItem;
