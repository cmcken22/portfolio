import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import HoverCard from "components/HoverCard";
import SlideInDiv from "components/SlideInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import { Sections } from "enums";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";

const Airbnb = () => {
  const { setActiveSection } = useSectionContext();

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
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              minHeight: "300px", // Set a minimum height for the container
              backgroundColor: "red",
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
                width: "100%", // Set fixed width for the iframe
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

  return (
    <>
      <StickySectionHeader>
        <Typography variant="h2">Airbnb</Typography>
      </StickySectionHeader>
      <SlideInDiv
        id={Sections.Airbnb}
        className="GRID_ITEM_BOX"
        index={getScrollOrder(Sections.Airbnb)}
        onMouseEnter={() => setActiveSection(Sections.Airbnb)}
      >
        <HoverCard hover px={32}>
          <Box
            sx={{
              width: "100%",
              "& svg, i, .MuiTypography-root": {
                transition: "all ease-in-out 0.3s !important",
              },
              "& svg, i": {
                color: "rgba(255, 255, 255, 0.5) !important",
              },
              "&:hover": {
                "& svg, i, .MuiTypography-root": {
                  color: "rgb(94, 234, 212) !important",
                  cursor: "default",
                },
              },
            }}
          >
            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">
                Check Out My Airbnb Listing ☀️🌴
              </h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                  minHeight: "300px", // Set a minimum height for the container
                }}
              >
                <div
                  className="airbnb-embed-frame"
                  data-id="1308860065021844564"
                  data-view="home"
                  data-hide-price="true"
                  style={{
                    width: "450px", // Set fixed width for the iframe
                    height: "300px", // Set fixed height for the iframe
                    margin: "auto", // This ensures the element is centered
                    borderRadius: "12px", // Add slight border radius
                    overflow: "hidden", // Ensure content doesn't spill over
                  }}
                >
                  <a
                    href="https://www.airbnb.ca/rooms/1308860065021844564?guests=1&adults=1&s=66&source=embed_widget"
                    target="_blank"
                    rel="nofollow"
                    className="text-blue-600"
                  >
                    View On Airbnb
                  </a>
                  <a
                    href="https://www.airbnb.ca/rooms/1308860065021844564?guests=1&adults=1&s=66&source=embed_widget"
                    rel="nofollow"
                    className="text-gray-600"
                  >
                    Condo in Tulum · ★New · 1 bedroom · 2 beds · 1 bath
                  </a>
                </div>
              </Box>
            </div>
          </Box>
        </HoverCard>
      </SlideInDiv>
    </>
  );
};

export default Airbnb;
