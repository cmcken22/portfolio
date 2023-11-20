import ListItem from "@components/ListItem";
import StickySectionHeader from "@components/StickySectionHeader";
import { Animation, Pages } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export const Items = [
  {
    company: "LockDocs Inc.",
    link: "https://lockdocs.com",
    positions: ["Sr Software Engineer"],
    startDate: "FEB 2023",
    endDate: "PRESENT",
    tags: ["React", "Firebase", "NodeJS", "NestJS", "Docker"],
    description: () => (
      <>
        <Typography variant="body2" color="primary.dark">
          As the lead developer, I played a pivotal role in re-architecting the
          frontend application, seamlessly integrating it with a more robust
          backend. Elevating performance and efficiency, I implemented an API
          layer using RTK Query. Additionally, I undertook a redesign of
          critical components, significantly enhancing scalability and
          productivity.
        </Typography>
      </>
    ),
  },
  {
    company: "Opendoor",
    link: "https://www.opendoor.com",
    positions: ["Software Engineer"],
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    tags: ["React", "React Native", "NextJS", "NodeJS", "Express"],
    description: () => (
      <>
        <Typography variant="body2" color="primary.dark">
          Developed the Opendoor mobile application with React Native, taking
          charge of the consolidation process to unify the IOS and Android apps
          into a single, cohesive platform
        </Typography>
      </>
    ),
  },
  {
    company: "EllisDon",
    link: "https://www.ellisdon.com",
    positions: ["Sr Software Engineer", "Tech Lead", "Full Stack Developer"],
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    tags: ["React", "NodeJS", "Express", "Micro Services", "Redis", "GCP"],
    description: () => (
      <>
        <Typography variant="body2" color="primary.dark">
          Produced high-quality and robust production code across an array of
          construction management projects. Instrumental in implementing
          critical user flows, including OAuth2 and Okta-based login
          functionalities. Played a pivotal role in the strategic replatforming
          initiative, transitioning the entire application from a Java-based web
          app to a more dynamic and responsive React application.
        </Typography>
      </>
    ),
  },
];

const Experience = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { small } = useMobile();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <motion.div
      id="experience"
      className="GRID_ITEM_BOX"
      initial={small ? { opacity: 1 } : { opacity: 0 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      onViewportEnter={() => {
        controls.start({ opacity: 1 });
      }}
    >
      <StickySectionHeader>
        <Typography variant="h2">Experience</Typography>
      </StickySectionHeader>
      <Box
        className="experience__list"
        sx={{
          paddingTop: {
            xs: 2,
            md: 12,
          },
        }}
      >
        <ul style={{ pointerEvents: inView ? "auto" : "none" }}>
          {Items?.map((item, index) => (
            <ListItem key={`list-item--${index}`} item={item} index={index} />
          ))}
        </ul>
      </Box>
    </motion.div>
  );
};

export default Experience;
