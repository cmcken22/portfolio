import { Box, Typography } from "@mui/material";
import ListItem from "components/ListItem";
import StickySectionHeader from "components/StickySectionHeader";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Animation, Pages, Sections } from "enums";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";

export const ProjectList = [
  {
    title: "Hokela",
    src: "/images/hokela.png",
    link: "https://demo.hokela.ca",
    description:
      "Built a volunteering application with a group of friends. Gained partnerships with over 50 organizations and connected over 100 users with volunteer opportunities.",
  },
  {
    title: "EllisDon Component Library",
    src: "/images/storybook.png",
    link: "https://cmcken22.github.io/ed-component-library",
    description:
      "Built a reusable component library for EllisDon with React, TypeScript, and MUI. Hosted on Storybook for documentation/testing and NPM for consumption.",
  },
  {
    title: "WatchWorldWide",
    src: "/images/watchworldwide.png",
    link: "https://www.watchworldwide.io/",
    description:
      "A streaming search engine I built with Next.js, helping users find where to watch movies and TV shows legally across services and countries.",
  },
];

const ProjectItem = ({ project, index }) => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const { small } = useMobile();
  const contentRef = useRef(null);

  return (
    <ListItem
      active={inView}
      index={getScrollOrder(`ProjectListItem--${index}`)}
    >
      <ListItem.Content ref={contentRef} link={project?.link}>
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
      </ListItem.Content>
    </ListItem>
  );
};

const Projects = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { small } = useMobile();
  const { setActiveSection } = useSectionContext();

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
