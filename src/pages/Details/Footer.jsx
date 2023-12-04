import useMobile from "contexts/useMobile";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const { mobileDevice } = useMobile();
  return (
    <Box
      width="100%"
      sx={{
        "& p": {
          width: "100%",
        },
        "& strong": {
          fontWeight: "regular",
          color: "primary.light",
        },
      }}
    >
      <Typography variant="body2" width="100%">
        I built this website to learn more about 3D Animations. This site was
        built with <strong>React</strong>, <strong>ThreeJS</strong>,{" "}
        <strong>Framer Motion</strong> and <strong>Material UI</strong>.
        Deployed using <strong>Vercel</strong>.{" "}
        {mobileDevice &&
          "Make sure to check out my site on a desktop for more cool animations!"}
      </Typography>
    </Box>
  );
};

export default Footer;
