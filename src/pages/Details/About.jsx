import StickySectionHeader from "@components/StickySectionHeader";
import { Animation, Pages, Sections } from "@constants";
import usePageContext from "@contexts/PageContext";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useSectionContext } from "./Header";

const carreerStateDate = new Date("2017-07-01");

const yearsSinceDate = (specificDate = carreerStateDate) => {
  const currentDate = new Date();
  const timeDifference = currentDate - specificDate;
  // Calculate the number of milliseconds in a year
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  // Calculate the number of years since the specific date
  const yearsSince = timeDifference / millisecondsInYear;
  // Round down to the nearest whole year
  const roundedYears = Math.floor(yearsSince);
  return roundedYears;
};

const AboutText = () => {
  return (
    <Box
      id="about"
      width="100%"
      variant="body1"
      color="primary.dark"
      sx={{
        paddingBottom: {
          xs: 12,
          md: 0,
        },
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
        I am a devoted <strong>Full Stack Developer</strong> with a background
        in <strong>Software Engineering</strong>. I have a drive for creating
        applications that prioritize scalability, maintainability, and
        user-friendliness.
      </Typography>
      <Typography variant="body1" color="primary.dark">
        As a seasoned Full Stack Developer with{" "}
        <strong>{yearsSinceDate()}+ years of experience</strong>, I am
        particularly enthusiastic about <strong>Front End Development</strong>{" "}
        and refining user experiences. My curiosity extends to exploring the
        realms of <strong>Data Encryption</strong> and{" "}
        <strong>3D Animations</strong>.
      </Typography>
      <Typography variant="body1" color="primary.dark">
        During my free time, I enjoy learning new technologies, going for hikes
        with my dog Miko, and expressing creativity through artwork.
      </Typography>
    </Box>
  );
};

const About = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { setActiveSection } = useSectionContext();

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 }, { duration: 0 });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [inView]);

  return (
    <Box
      id="about"
      className="GRID_ITEM_BOX"
      component={motion.div}
      initial={{ opacity: 1 }}
      animate={controls}
      transition={{ duration: Animation.duration, delay: Animation.delay }}
      onMouseEnter={() => setActiveSection(Sections.About)}
      sx={{
        paddingTop: {
          xs: 10,
          md: 12,
        },
      }}
    >
      <StickySectionHeader>
        <Typography variant="h2">About</Typography>
      </StickySectionHeader>
      <AboutText />
    </Box>
  );
};

export default About;
