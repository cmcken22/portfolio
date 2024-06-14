import { Box, Typography } from "@mui/material";
import CustomTooltip from "components/CustomTooltip";
import FadeInDiv from "components/FadeInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import UnderlinedText from "components/UnderlinedText";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Pages, Sections, SocialLinks } from "enums";
import { forwardRef } from "react";
import { useSectionContext } from "./Header";

// const carreerStateDate = new Date("2017-07-01");
const carreerStateDate = new Date("2017-06-01");

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

const AboutText = forwardRef((props, ref) => {
  const { mobile } = useMobile();

  return (
    <Box
      ref={ref}
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
        During my free time, I enjoy learning new technologies, playing
        pickleball, going for hikes with my dog Miko, and expressing creativity
        through&nbsp;
        <CustomTooltip
          placement="top"
          title="Check out some of my artwork here!"
        >
          <UnderlinedText
            underlined={mobile}
            onClick={() => window.open(SocialLinks.flickr, "_blank")}
            variant="body1"
            component="strong"
            color="primary.dark"
          >
            artwork
          </UnderlinedText>
        </CustomTooltip>
        .
      </Typography>
    </Box>
  );
});

const About = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const { setActiveSection } = useSectionContext();

  return (
    <FadeInDiv
      name="About"
      id={Sections.About}
      className="GRID_ITEM_BOX"
      active={inView}
      // theshold={0.5}
      onMouseEnter={() => setActiveSection(Sections.About)}
      sx={{
        paddingTop: {
          xs: 10,
          md: 12,
        },
        marginBottom: {
          xs: 0,
          md: 6,
          lg: 6,
        },
      }}
    >
      <StickySectionHeader>
        <Typography variant="h2">About</Typography>
      </StickySectionHeader>
      <AboutText />
    </FadeInDiv>
  );
};

export default About;
