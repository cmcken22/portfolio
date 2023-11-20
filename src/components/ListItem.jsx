import { Animation, Pages } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import ShinyCard from "./ShinyCard";

export const Items = [
  {
    company: "LockDocs Inc.",
    link: "https://lockdocs.com",
    positions: ["Sr Software Engineer"],
    startDate: "FEB 2023",
    endDate: "PRESENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["React", "Firebase", "NodeJS", "NestJS", "Docker"],
  },
  {
    company: "Opendoor",
    link: "https://www.opendoor.com",
    positions: ["Software Engineer"],
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["React", "React Native", "NextJS", "NodeJS", "Express"],
  },
  {
    company: "EllisDon",
    link: "https://www.ellisdon.com",
    positions: ["Sr Software Engineer", "Tech Lead", "Full Stack Developer"],
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
  const { startDate, endDate, positions, company, description, tags } = item;
  const controls = useAnimation();
  const { activePage } = usePageContext();
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
    if (activePage !== Pages.Details && !small) {
      controls.start(exitState, { duration: 0 });
    }
  }, [activePage, exitState, small]);

  useEffect(() => {
    if (activePage === Pages.Details && small) {
      controls.start(activeState, { duration: 0 });
    }
  }, [activePage, small]);

  const handleOpenLink = useCallback((link) => {
    window.open(link, "_blank");
  }, []);

  const renderContent = useCallback(() => {
    return (
      <Box
        onClick={() => handleOpenLink(item?.link)}
        sx={{
          "&:hover": {
            cursor: "pointer",
            "& .company": {
              color: "rgb(94, 234, 212) !important",
            },
            "& .out-icon": {
              bottom: "2px !important",
              left: "2px !important",
              color: "rgb(94, 234, 212) !important",
            },
          },
        }}
      >
        <ShinyCard active={cardHoverStatus?.[index] && !small}>
          <li className="LIST_ITEM">
            <Grid container>
              <Grid item xs={12} sm={3} md={4}>
                <Typography mb={1} textAlign="left" variant="subtitle1">
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="company"
                    textAlign="left"
                    width="fit-content"
                    sx={{
                      cursor: "pointer",
                      transition: "all ease-in-out 0.3s !important",
                      mr: 0.5,
                    }}
                  >
                    {positions?.[0]} · {company}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      // alignItems: "center",
                      // backgroundColor: "red",
                      height: "20px",
                      width: "20px",
                      "& svg": {
                        transition: "all ease-in-out 0.3s !important",
                        // backgroundColor: "blue",
                        height: "100%",
                        width: "100%",
                        transform: "scale(0.8)",
                        position: "absolute",
                        bottom: "-2px",
                        left: "-2px",
                      },
                    }}
                  >
                    <ArrowOutwardIcon className="out-icon" />
                  </Box>
                </Box>
                {positions?.map((position, i) =>
                  i === 0 ? null : (
                    <Typography
                      key={`position--${position}`}
                      textAlign="left"
                      width="100%"
                      color="primary.darker"
                    >
                      {position}
                    </Typography>
                  )
                )}
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
    index,
    positions,
    startDate,
    tags,
    small,
    handleOpenLink,
  ]);

  const renderWrapper = useCallback(() => {
    if (small) {
      return (
        <Box
          key={`${item?.company}--${item?.positions?.[0]}--small`}
          className="LIST_ITEM_WRAPPER--small"
          mb={6}
        >
          {renderContent()}
        </Box>
      );
    }
    return (
      <motion.div
        key={`${item?.company}--${item?.positions?.[0]}`}
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
