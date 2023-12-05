import { Box, Typography } from "@mui/material";
import FadeInDiv from "components/FadeInDiv";
import LinkIndicator from "components/LinkIndicator";
import ListItem from "components/ListItem";
import SlideInDiv from "components/SlideInDiv";
import StickySectionHeader from "components/StickySectionHeader";
import UnderlinedText from "components/UnderlinedText";
import usePageContext from "contexts/PageContext";
import { Pages, Sections } from "enums";
import { useCallback, useRef } from "react";
import { getScrollOrder } from "utils";
import { useSectionContext } from "./Header";

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
        <Typography variant="body2" color="primary.dark" width="100%">
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
        <Typography variant="body2" color="primary.dark" width="100%">
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
        <Typography variant="body2" color="primary.dark" width="100%">
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

const ResumeLink = () => {
  const handleOpenResume = useCallback(() => {
    window.open("/Conner_McKenna_-_Software_Engineer.pdf", "_blank");
  }, []);

  const renderContent = useCallback(() => {
    return (
      <LinkIndicator
        sx={{ mt: 6 }}
        arrowType="straight"
        onClick={handleOpenResume}
      >
        <UnderlinedText>View full resume</UnderlinedText>
      </LinkIndicator>
    );
  }, [handleOpenResume]);

  const renderWrapper = useCallback(() => {
    return (
      <SlideInDiv
        key="resume-wrapper"
        className="resume-wrapper"
        index={getScrollOrder("ResumeLink")}
        sx={{ width: "fit-content" }}
      >
        {renderContent()}
      </SlideInDiv>
    );
  }, [renderContent]);

  return renderWrapper();
};

const ExperienceItem = ({ item, index }) => {
  const contentRef = useRef(null);
  const { startDate, endDate, positions, company, description, tags, link } =
    item;

  return (
    <ListItem index={getScrollOrder(`ListItem--${index}`)}>
      <ListItem.Content ref={contentRef} link={link}>
        <ListItem.LeftSide>
          <Typography mb={1} textAlign="left" variant="subtitle1">
            {startDate} — {endDate}
          </Typography>
        </ListItem.LeftSide>
        <ListItem.RightSide>
          <ListItem.Title componentRef={contentRef?.current}>
            {positions?.[0]} · {company}
          </ListItem.Title>
          {positions?.map((position, i) =>
            i === 0 ? null : (
              <ListItem.Subtitle key={`position--${position}`}>
                {position}
              </ListItem.Subtitle>
            )
          )}
          <ListItem.Description>{description()}</ListItem.Description>
          <ListItem.Tags tags={tags} />
        </ListItem.RightSide>
      </ListItem.Content>
    </ListItem>
  );
};

const Experience = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const { setActiveSection } = useSectionContext();

  return (
    <FadeInDiv
      id={Sections.Experience}
      className="GRID_ITEM_BOX"
      active={inView}
      onMouseEnter={() => setActiveSection(Sections.Experience)}
      sx={{
        paddingTop: {
          xs: 10,
          md: 12,
        },
      }}
    >
      <StickySectionHeader>
        <Typography variant="h2">Experience</Typography>
      </StickySectionHeader>
      <Box className="experience__list">
        <ul style={{ pointerEvents: inView ? "auto" : "none" }}>
          {Items?.map((item, index) => (
            <ExperienceItem
              key={`list-item--${index}`}
              item={item}
              index={index}
            />
          ))}
        </ul>
      </Box>
      <ResumeLink index={Items.length} />
    </FadeInDiv>
  );
};

export default Experience;
