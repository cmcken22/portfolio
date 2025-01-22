import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import SlideInDiv from "components/SlideInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import { Sections } from "enums";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";
import useMobile from "contexts/useMobile";
import HoverCard from "components/HoverCard";

const Airbnb = () => {
  const { setActiveSection } = useSectionContext();
  const { mobile } = useMobile();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Load the Airbnb SDK script when the component mounts
    const script = document.createElement("script");
    script.src = "https://www.airbnb.ca/embeddable/airbnb_jssdk";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script on unmount
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const contentWrapper = document.querySelector(`.GRID_CONTAINER`);
      if (!contentWrapper || !mobile) {
        setOffset(0);
        return;
      }
      const computedStyle = window.getComputedStyle(contentWrapper);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      console.log("paddingLeft:", paddingLeft);
      setOffset(paddingLeft);
    };
    window.onload = () => resize();
    window.onresize = () => resize();
    resize();
  }, [mobile, setOffset]);

  return (
    <>
      <StickySectionHeader>
        <Typography variant="h2">Airbnb</Typography>
      </StickySectionHeader>
      <SlideInDiv
        id={Sections.Airbnb}
        className="GRID_ITEM_BOX"
        index={getScrollOrder(Sections.Airbnb)}
        onMouseEnter={() => {
          setActiveSection(Sections.Airbnb);
        }}
      >
        <Box
          width="100%"
          sx={{
            "& p": {
              width: "100%",
              mb: 2,
            },
            "& strong": {
              fontWeight: "regular",
              color: "primary.light",
            },
          }}
        >
          <Typography variant="body1" color="primary.dark">
            On a side note, I also run a cozy Airbnb in the heart of{" "}
            <strong>Tulum, Mexico!</strong>&nbsp; If you're looking for the
            ultimate getaway, check it out here!
          </Typography>

          <HoverCard
            px={offset}
            disabled
            sx={{
              padding: "0 !important",
            }}
          >
            <div
              class="airbnb-embed-frame"
              data-id="1308860065021844564"
              data-view="home"
              data-hide-price="true"
              style={{ width: "450px", height: "300px", margin: "auto" }}
            />
          </HoverCard>
        </Box>
      </SlideInDiv>
    </>
  );
};

const AirbnbWrapper = () => {
  const { mobile } = useMobile();
  return <Airbnb key={`airbnb--${mobile}`} />;
};

export default AirbnbWrapper;
