import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import useMobile from "@contexts/useMobile";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { FaNodeJs, FaReact, FaSass } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiRedux } from "react-icons/si";
import HoverCard from "./HoverCard";
import { StickySectionHeader, fontColor } from "./Sections/Details";

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
    name: "NodeJS",
    Icon: () => <FaNodeJs />,
  },
  {
    name: "MongoDB",
    Icon: () => <DiMongodb />,
  },
  {
    name: "JavaScript",
    Icon: () => <IoLogoJavascript />,
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
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();
  const { mobile, small } = useMobile();

  useEffect(() => {
    if (!inView && !small) {
      controls.start({ opacity: 0, x: -500 }, { duration: 0 });
    }
  }, [inView, small]);

  useEffect(() => {
    if (small) {
      controls.start({ opacity: 1, x: 0 }, { duration: 0 });
    }
  }, [small, inView]);

  return (
    <>
      <StickySectionHeader>
        <Typography variant="h2" color={fontColor} fontSize="2rem">
          Toolkit
        </Typography>
      </StickySectionHeader>
      <motion.div
        id="toolkit"
        className="GRID_ITEM_BOX"
        initial={{ opacity: 0, x: -500 }}
        animate={controls}
        transition={{ duration: Animation.duration, delay: Animation.delay }}
        threshold={1}
        onViewportEnter={() => {
          controls.start({ opacity: 1, x: 0 });
        }}
      >
        <HoverCard>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              "& svg, i, .MuiTypography-root": {
                transition: "all ease-in-out 0.3s !important",
              },
              "&:hover": {
                "& svg, i, .MuiTypography-root": {
                  color: "rgb(94, 234, 212) !important",
                  cursor: "default",
                },
              },
            }}
          >
            {Tools?.map((tool) => (
              <Box
                key={`tool--${tool?.name}`}
                sx={{
                  height: "60px",
                  flex: "1",
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
        </HoverCard>
      </motion.div>
    </>
  );
};

export default Toolkit;
