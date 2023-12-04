import { Animation, Pages } from "enums";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import LinkIndicator from "./LinkIndicator";
import ShinyCard from "./ShinyCard";

const Wrapper = forwardRef(({ children, active, index = 0, ...rest }, ref) => {
  const controls = useAnimation();
  const timer = useRef(null);
  const { small } = useMobile();

  const activeState = useMemo(() => {
    return { opacity: 1, x: 0 };
  }, []);

  const exitState = useMemo(() => {
    return { opacity: 0, x: -500 };
  }, []);

  useEffect(() => {
    if (active && !small) {
      controls.start(exitState, { duration: 0 });
    }
  }, [active, exitState, small]);

  useEffect(() => {
    if (active && small) {
      controls.start(activeState, { duration: 0 });
    }
  }, [active, small]);

  const renderWrapper = useCallback(() => {
    if (small) {
      return (
        <Box
          className="LIST_ITEM_WRAPPER--small"
          sx={{
            marginBottom: "6rem",
            "&:last-child": {
              marginBottom: "0",
            },
          }}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
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
        {...rest}
      >
        <ShinyCard>{children}</ShinyCard>
      </Box>
    );
  }, [children, small, controls, activeState, exitState, index]);

  return renderWrapper()
});

const Content = forwardRef(({ children, link }, ref) => {
  const handleOpenLink = useCallback((link) => {
    if (!link) return;
    window.open(link, "_blank");
  }, []);

  return (
    <Box
      ref={ref}
      className="LIST_ITEM_TEST"
      onClick={() => handleOpenLink(link)}
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
      <Grid container className="LIST_ITEM">
        {children}
      </Grid>
    </Box>
  );
});

const LeftSide = forwardRef(({ children }, ref) => {
  return (
    <Grid item xs={12} sm={12} md={3.2}>
      {children}
    </Grid>
  );
});

const RightSide = forwardRef(({ children }, ref) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={8.8}
      sx={{
        paddingLeft: { md: "1rem" },
      }}
    >
      {children}
    </Grid>
  );
});

const Title = forwardRef(({ children, componentRef }, ref) => {
  return (
    <LinkIndicator arrowType="diagonal" componentRef={componentRef}>
      <Typography
        className="company"
        textAlign="left"
        width="fit-content"
        sx={{
          cursor: "pointer",
          transition: "all ease-in-out 0.3s !important",
        }}
      >
        {children}
      </Typography>
    </LinkIndicator>
  );
});

const Description = forwardRef(({ children }, ref) => {
  return <Box mt={1}>{children}</Box>;
});

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

  const renderContent = useCallback(() => {
    return (
      <Content ref={contentRef} link={item?.link}>
        <LeftSide>
          <Typography mb={1} textAlign="left" variant="subtitle1">
            {startDate} — {endDate}
          </Typography>
        </LeftSide>
        <RightSide>
          <Title componentRef={contentRef?.current}>
            {positions?.[0]} · {company}
          </Title>
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
          <Description>{description()}</Description>
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
        </RightSide>
      </Content>
    );
  }, [company, description, endDate, index, positions, startDate, tags, small]);

  return (
    <Wrapper
      key={`${item?.company}--${item?.positions?.[0]}`}
      index={index}
      active={activePage === Pages.Details && !small}
    >
      {renderContent()}
    </Wrapper>
  );
});

ListItem.Wrapper = Wrapper;
ListItem.Content = Content;
ListItem.LeftSide = LeftSide;
ListItem.RightSide = RightSide;
ListItem.Title = Title;
ListItem.Description = Description;
export default ListItem;
