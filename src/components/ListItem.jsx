import { Animation, Pages } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import LinkIndicator from "./LinkIndicator";
import ShinyCard from "./ShinyCard";

const ListItem = memo(({ item, index }) => {
  const { startDate, endDate, positions, company, description, tags } = item;
  const contentRef = useRef(null);
  const controls = useAnimation();
  const { activePage } = usePageContext();
  const timer = useRef(null);
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
        ref={contentRef}
        className="LIST_ITEM_TEST"
        onClick={() => handleOpenLink(item?.link)}
        sx={{
          width: "100%",
          "&:hover": {
            cursor: "pointer",
            "& .company": {
              color: "rgb(94, 234, 212) !important",
            },
          },
        }}
      >
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
              <LinkIndicator
                arrowType="diagonal"
                componentRef={contentRef?.current}
              >
                <Typography
                  className="company"
                  textAlign="left"
                  width="fit-content"
                  sx={{
                    cursor: "pointer",
                    transition: "all ease-in-out 0.3s !important",
                  }}
                >
                  {positions?.[0]} · {company}
                </Typography>
              </LinkIndicator>
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
              <Box mt={2}>{description()}</Box>
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
      </Box>
    );
  }, [
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
          sx={{
            marginBottom: "6rem",
            "&:last-child": {
              marginBottom: "0",
            },
          }}
        >
          {renderContent()}
        </Box>
      );
    }
    return (
      <Box
        key={`${item?.company}--${item?.positions?.[0]}`}
        className="LIST_ITEM_WRAPPER"
        component={motion.div}
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
        sx={{
          willChange: "opacity, transform",
          marginBottom: "6rem",
          "&:last-child": {
            marginBottom: "0",
          },
        }}
      >
        <ShinyCard>{renderContent()}</ShinyCard>
      </Box>
    );
  }, [renderContent, controls, activeState, index, item, small]);

  return renderWrapper();
});

export default ListItem;
