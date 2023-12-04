import HoverCard from "components/HoverCard";
import StickySectionHeader from "components/StickySectionHeader";
import ListItem from "components/ListItem";
import { Animation, Pages, Sections } from "enums";
import usePageContext from "contexts/PageContext";
import useMobile, { useBreakPoint } from "contexts/useMobile";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, List, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { FaNodeJs, FaReact, FaSass } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiRedux } from "react-icons/si";
import { useSectionContext } from "./Header";
import { Items } from "./Experience";

const ProjectList = [
  {
    title: "Hokela",
    src: "/images/hokela.png",
    link: "https://demo.hokela.ca",
    description:
      "Built a volunteering application with a group of friends. Gained partnerships with over 50 organizations and connected over 100 users with volunteer opportunities.",
  },
];

const ProjectItem = ({ project, index }) => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const { small } = useMobile();
  const contentRef = useRef(null);

  return (
    <ListItem.Wrapper active={inView} index={Items.length + 1 + index}>
      <ListItem.Content ref={contentRef} link="https://demo.hokela.ca">
        {!small && (
          <ListItem.LeftSide>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <img
                src={project?.src}
                alt={project?.title}
                style={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "200px",
                }}
              />
            </Box>
          </ListItem.LeftSide>
        )}
        <ListItem.RightSide>
          <ListItem.Title componentRef={contentRef?.current}>
            {project?.title}
          </ListItem.Title>
          <ListItem.Description>
            <Typography variant="body2" color="primary.dark" width="100%">
              {project?.description}
            </Typography>
          </ListItem.Description>
        </ListItem.RightSide>
        {small && (
          <ListItem.LeftSide>
            <Box
              mt={2}
              sx={{
                width: "100%",
              }}
            >
              <img
                src="/images/hokela.png"
                alt="hokela"
                style={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "200px",
                }}
              />
            </Box>
          </ListItem.LeftSide>
        )}
      </ListItem.Content>
    </ListItem.Wrapper>
  );
};

const Projects = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { small } = useMobile();
  const { setActiveSection } = useSectionContext();
  const contentRef = useRef(null);

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
        <Typography variant="h2">Projects</Typography>
      </StickySectionHeader>
      <motion.div
        id={Sections.Projects}
        className="GRID_ITEM_BOX"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: Animation.duration, delay: Animation.delay }}
        threshold={1}
        onViewportEnter={() => controls.start({ opacity: 1 })}
        onMouseEnter={() => setActiveSection(Sections.Projects)}
      >
        {ProjectList.map((project, i) => (
          <ProjectItem key={`project--${i}`} project={project} index={i} />
        ))}
      </motion.div>
    </>
  );
};

export default Projects;
