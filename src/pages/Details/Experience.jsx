import ListItem, { Items } from "@components/ListItem";
import StickySectionHeader from "@components/StickySectionHeader";
import { Animation, Sections } from "@constants";
import usePageContext from "@contexts/PageContext";
import useMobile from "@contexts/useMobile";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Experience = () => {
  const inView = usePageContext()?.activePage === Sections.Details;
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
        sx={{
          paddingTop: {
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
