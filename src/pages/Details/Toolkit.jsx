import HoverCard from "@components/HoverCard";
import StickySectionHeader from "@components/StickySectionHeader";
import { Animation, Pages } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { FaNodeJs, FaReact, FaSass } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiRedux } from "react-icons/si";

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
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { small } = useMobile();
  const [hoverRef, setHoverRef] = useState(null);

  useEffect(() => {
    if (!inView && !small) {
      controls.start({ opacity: 0 }, { duration: 0 });
    }
  }, [inView, small]);

  useEffect(() => {
    if (small) {
      controls.start({ opacity: 1 }, { duration: 0 });
    }
  }, [small, inView]);

  return (
    <>
      <StickySectionHeader>
        <Typography variant="h2">Toolkit</Typography>
      </StickySectionHeader>
      <motion.div
        id="toolkit"
        className="GRID_ITEM_BOX"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: Animation.duration, delay: Animation.delay }}
        threshold={1}
        onViewportEnter={() => {
          controls.start({ opacity: 1 });
        }}
      >
        <HoverCard hoverRef={hoverRef}>
          <Box
            ref={(r) => setHoverRef(r)}
            sx={{
              width: "fit-content",
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
            <Box
              className="INNER_CONTAINER"
              sx={{
                // backgroundColor: "blue",
                width: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                maxWidth: "600px",
                justifyContent: "center",
              }}
            >
              {Tools?.map((tool) => (
                <Box
                  key={`tool--${tool?.name}`}
                  sx={{
                    height: "60px",
                    // flex: "1 0 21%",
                    flex: 0,
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: "30px",
                      width: "30px",
                      marginRight: 1,
                      "& > svg, i": {
                        height: "100%",
                        width: "100%",
                      },
                    }}
                  >
                    {tool?.Icon && tool?.Icon()}
                  </Box>
                  <Typography
                    sx={{
                      width: "fit-content",
                    }}
                  >
                    {tool?.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </HoverCard>
      </motion.div>
    </>
  );
};

export default Toolkit;
