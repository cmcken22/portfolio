import { Box, Chip, Grid, Typography } from "@mui/material";
import useMobile from "contexts/useMobile";
import { forwardRef, useCallback } from "react";
import LinkIndicator from "./LinkIndicator";
import ShinyCard from "./ShinyCard";
import SlideInDiv from "./SlideInDiv";

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

const Subtitle = forwardRef(({ children }, ref) => {
  return (
    <Typography textAlign="left" width="100%" color="primary.darker">
      {children}
    </Typography>
  );
});

const Description = forwardRef(({ children }, ref) => {
  return <Box mt={1}>{children}</Box>;
});

const Tags = forwardRef(({ tags }, ref) => {
  return (
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
  );
});

const ListItem = forwardRef(({ children, active, index = 0, ...rest }, ref) => {
  const { small } = useMobile();

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
      <SlideInDiv
        className="LIST_ITEM_WRAPPER"
        index={index}
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
      </SlideInDiv>
    );
  }, [
    children,
    small,
    // controls,
    // activeState,
    // exitState,
    index,
  ]);

  return renderWrapper();
});

ListItem.Content = Content;
ListItem.LeftSide = LeftSide;
ListItem.RightSide = RightSide;
ListItem.Title = Title;
ListItem.Subtitle = Subtitle;
ListItem.Description = Description;
ListItem.Tags = Tags;
export default ListItem;
