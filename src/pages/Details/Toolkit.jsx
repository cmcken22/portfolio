import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Typography } from "@mui/material";
import HoverCard from "components/HoverCard";
import SlideInDiv from "components/SlideInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import { Sections } from "enums";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { FaNodeJs, FaReact, FaSass } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiRedux } from "react-icons/si";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";

const Tools = [
  {
    name: "React",
    Icon: () => <FaReact />,
  },
  {
    name: "Redux",
    Icon: () => <SiRedux />,
  },
  {
    name: "JavaScript",
    Icon: () => <IoLogoJavascript />,
  },
  {
    name: "NodeJS",
    Icon: () => <FaNodeJs />,
  },
  {
    name: "MongoDB",
    Icon: () => <DiMongodb />,
  },
  {
    name: "Sass",
    Icon: () => <FaSass />,
  },
  {
    name: "TypeScript",
    Icon: () => <BiLogoTypescript />,
  },
  {
    name: "Docker",
    Icon: () => (
      <FontAwesomeIcon
        icon={faDocker}
        style={{ color: "rgb(136, 139, 148)" }}
      />
    ),
  },
];

const Toolkit = () => {
  const { setActiveSection } = useSectionContext();

  return (
    <>
      <StickySectionHeader>
        <Typography variant="h2">Toolkit</Typography>
      </StickySectionHeader>
      <SlideInDiv
        id="toolkit"
        className="GRID_ITEM_BOX"
        index={getScrollOrder("Toolkit")}
        onMouseEnter={() => setActiveSection(Sections.Toolkit)}
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
            <Grid
              container
              className="INNER_CONTAINER"
              sx={{
                // justifyContent: "space-evenly",
                justifyContent: "space-between",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 124px)",
                gridGap: "1rem",
              }}
            >
              {Tools?.map((tool) => (
                <Grid
                  item
                  className="TOOL"
                  key={`tool--${tool?.name}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    color: "white",
                  }}
                >
                  <Box
                    sx={{
                      height: "20px",
                      width: "20px",
                      mr: "1rem !important",
                      "& > svg, i": {
                        height: "100%",
                        width: "100%",
                      },
                    }}
                  >
                    {tool?.Icon && tool?.Icon()}
                  </Box>
                  <Typography sx={{ width: "fit-content" }}>
                    {tool?.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </HoverCard>
      </SlideInDiv>
    </>
  );
};

export default Toolkit;
