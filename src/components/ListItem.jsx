import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import useMobile from "@contexts/useMobile";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
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

import { create } from "zustand";

export const cardContext = create((set) => ({
  currentCard: "",
  cardHoverStatus: {},
  setCurrentCard: (value) => set(() => ({ currentCard: value })),
  setCardHoverStatus: (index, value) => {
    set((state) => {
      const { cardHoverStatus } = state;
      const nextCardHoverStatus = { ...cardHoverStatus };
      for (const key in nextCardHoverStatus) {
        nextCardHoverStatus[key] = false;
      }
      nextCardHoverStatus[index] = value;
      return { cardHoverStatus: nextCardHoverStatus };
    });
  },
}));

export const useCardContext = () => {
  const state = cardContext((state) => state);
  return state;
};

const ListItem = memo(({ item, index }) => {
  const { startDate, endDate, position, company, description, tags } = item;
  const controls = useAnimation();
  const { activeSection } = useSectionContext();
  const timer = useRef(null);
  const { cardHoverStatus, setCardHoverStatus } = useCardContext();
  const { small } = useMobile();

  const activeState = useMemo(() => {
    return { opacity: 1, x: 0 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0, x: -500 };
  }, []);

  useEffect(() => {
    if (activeSection !== Sections.Details && !small) {
      controls.start(exitState, { duration: 0 });
    }
  }, [activeSection, exitState, small]);

  useEffect(() => {
    if (activeSection === Sections.Details && small) {
      controls.start(activeState, { duration: 0 });
    }
  }, [activeSection, small]);

  const fontColor = "rgb(148, 163, 184)";

  const renderContent = useCallback(() => {
    return (
      <Box
        sx={{
          "&:hover": {
            "& .company": {
              color: "rgb(94, 234, 212)",
            },
          },
        }}
      >
        <ShinyCard active={cardHoverStatus?.[index] && !small}>
          <li className="LIST_ITEM">
            <Grid container>
              <Grid item xs={12} sm={3} md={4}>
                <Typography
                  // color={fontColor}
                  textAlign="left"
                  fontSize="12px"
                >
                  {startDate} — {endDate}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={9}
                md={8}
                sx={{
                  paddingLeft: { sm: "1rem" },
                }}
              >
                <Typography
                  className="company"
                  color={fontColor}
                  textAlign="left"
                  width="100%"
                  sx={{
                    transition: "all ease-in-out 0.3s !important",
                  }}
                >
                  {company}
                </Typography>
                <Typography textAlign="left" width="100%">
                  {position}
                </Typography>
                <Typography
                  textAlign="left"
                  width="100%"
                  variant="body2"
                  // fontSize="14px"
                  mt={2}
                >
                  {description}
                </Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mt={1}>
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
      </Box>
    );
  }, [
    cardHoverStatus,
    company,
    description,
    endDate,
    fontColor,
    index,
    position,
    startDate,
    tags,
    small,
  ]);

  const renderWrapper = useCallback(() => {
    if (small) {
      return (
        <div
          key={`${item?.company}--${item?.position}--small`}
          className="LIST_ITEM_WRAPPER--small"
        >
          {renderContent()}
        </div>
      );
    }
    return (
      <motion.div
        key={`${item?.company}--${item?.position}`}
        className="LIST_ITEM_WRAPPER"
        initial={small ? activeState : exitState}
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
        onMouseEnter={() => {
          setCardHoverStatus(index, true);
        }}
        onMouseLeave={() => {
          setCardHoverStatus(index, true);
        }}
      >
        {renderContent()}
      </motion.div>
    );
  }, [
    renderContent,
    controls,
    activeState,
    index,
    item,
    setCardHoverStatus,
    small,
  ]);

  return renderWrapper();
});

export default ListItem;
