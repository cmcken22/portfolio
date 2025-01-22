import React, { useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import HoverCard from "components/HoverCard";
import SlideInDiv from "components/SlideInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import { Sections } from "enums";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";

const Airbnb = () => {
  const { setActiveSection } = useSectionContext();
  const iframeContainer = useRef(null);

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
      let rooms = document.getElementsByClassName("airbnb-embed-frame");
      console.clear();
      console.log("rooms:", rooms);
      console.log("iframeContainer:", iframeContainer?.current);
      const containerWidth = iframeContainer?.current?.clientWidth;
      for (let room of rooms) {
        console.log("room:", room);
        console.log("containerWidth:", containerWidth);
        // room.style.width = containerWidth + "px";
        if (containerWidth < 500) {
          let scale = (containerWidth - 20) / room.offsetWidth;
          // scale = 0.5;
          console.log("scale:", scale);
          room.style.transform = "scale(" + scale + ")";
        } else {
          console.log("scale>>:", 1);
          room.style.transform = "scale(1)";
        }
      }
    };
    window.onload = () => resize();
    window.onresize = () => resize();
  }, []);

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
          console.log("MOUSE ENTERED AIRBNB");
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
          <Typography variant="body1" color="primary.dark"></Typography>

          <Box
            ref={iframeContainer}
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              minHeight: "300px", // Set a minimum height for the container
              // backgroundColor: "red",
              width: "100%",
              overflow: "hidden", // Ensure content doesn't spill over
            }}
          >
            <div
              className="airbnb-embed-frame"
              data-id="1308860065021844564"
              data-view="home"
              data-hide-price="true"
              style={{
                // width: "450px", // Set fixed width for the iframe
                width: "100%",
                height: "300px", // Set fixed height for the iframe
                margin: "auto", // This ensures the element is centered
                borderRadius: "12px", // Add slight border radius
                overflow: "hidden", // Ensure content doesn't spill over
              }}
            />
          </Box>
        </Box>
      </SlideInDiv>
    </>
  );
};

export default Airbnb;
