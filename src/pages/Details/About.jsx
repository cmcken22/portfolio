import StickySectionHeader from "@components/StickySectionHeader";
import { Animation, Sections } from "@constants";
import usePageContext from "@contexts/PageContext";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const About = () => {
  const inView = usePageContext()?.activePage === Sections.Details;
  const controls = useAnimation();

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
      onViewportEnter={() => {}}
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
      <Typography
        id="about"
        width="100%"
        sx={{
          paddingBottom: {
            xs: 12,
            md: 0,
          },
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        quod tempore! Eos sunt a reiciendis veniam ab eum aperiam placeat natus
        dolore soluta autem sequi, doloribus provident. Asperiores, dolore nam?
      </Typography>
    </Box>
  );
};

export default About;
