import ListItem, { Items } from "@components/ListItem";
import Toolkit from "@components/Toolkit";
import { Animation, Sections } from "@constants";
import useSectionContext from "@contexts/SectionContext";
import useMobile, { useBreakPoint } from "@contexts/useMobile";
import { Box, Grid, Typography, styled } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import debounce from "lodash.debounce";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

const typingDelay = 2000;

const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "1280px",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },

  // [theme.breakpoints.down("sm")]: {
  //   backgroundColor: "red",
  // },
  // [theme.breakpoints.down("md")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
}));

const StickyHeader = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
  const controls = useAnimation();
  const [activeSection, setActiveSection] = useState("about");
  const scrollElm = useRef(null);
  const { small } = useMobile();
  const [typingAnimationKey, setTypingAnimationKey] = useState(0);

  useEffect(() => {
    if (!inView && !small) {
      controls.start({ opacity: 0 });
    }
  }, [inView, small]);

  useEffect(() => {
    setTypingAnimationKey((prev) => prev + 1);
  }, [inView]);

  const handleScroll = useCallback(() => {
    if (small) return;
    const elm1 = document.getElementById("about");
    const elm2 = document.getElementById("experience");
    const elm3 = document.getElementById("toolkit");
    const elms = [elm1, elm2, elm3];

    // detect closest element to top of the scroll container
    let closest = null;
    let closestDistance = Infinity;
    elms.forEach((elm) => {
      if (elm) {
        const distance = Math.abs(elm.getBoundingClientRect().top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = elm;
        }
      }
    });

    // set active section
    if (closest) {
      const id = closest.id;
      setActiveSection(id);
    }
  }, [setActiveSection]);

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    scrollElm.current = document.querySelector(".__container");
    if (scrollElm.current) {
      scrollElm.current.addEventListener("scroll", debouncedHandleScroll);
    }
    return () => {
      if (scrollElm.current) {
        scrollElm.current.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [debouncedHandleScroll]);

  const renderList = useCallback(() => {
    const list = [
      {
        id: "about",
        label: "About",
      },
      {
        id: "experience",
        label: "Experience",
      },
      {
        id: "toolkit",
        label: "Toolkit",
      },
    ];

    if (small) return null;

    return (
      <ul style={{ marginTop: "4rem" }}>
        {list.map((item) => (
          <li key={item?.id}>
            <Box
              py="12px"
              sx={{
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  "& .line": {
                    height: "1px",
                    width: "64px",
                  },
                  "& a": {
                    fontWeight: "bold !important",
                    color: "white !important",
                  },
                },
              }}
            >
              <Box
                className="line"
                sx={{
                  height: activeSection === item?.id ? "1px" : "0.5px",
                  width: activeSection === item?.id ? "64px" : "32px",
                  backgroundColor: "white",
                  marginRight: 1,
                  transition: "all 0.2s ease-in-out",
                }}
              />

              <a
                href={`#${item?.id}`}
                style={{
                  fontWeight: activeSection === item?.id ? "bold" : "normal",
                  transition: "all 0.2s ease-in-out",
                  color: activeSection === item?.id ? "white" : "",
                }}
              >
                {item?.label}
              </a>
            </Box>
          </li>
        ))}
      </ul>
    );
  }, [small, activeSection]);

  const renderSocials = useCallback(() => {
    const list = [
      {
        id: "github",
        label: "Github",
        icon: () => <FaGithub />,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: () => <FaLinkedin />,
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: () => <BsInstagram />,
      },
      {
        id: "email",
        label: "Email",
        icon: () => <MdEmail />,
      },
    ];

    return (
      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        sx={{
          position: {
            md: "absolute",
          },
          marginTop: "2rem",
          bottom: {
            xs: "3rem",
            md: "6rem",
          },
        }}
      >
        {list?.map((item) => (
          <Box
            sx={{
              height: "24px",
              width: "24px",
              "& svg": {
                height: "100%",
                width: "100%",
                cursor: "pointer",
              },
              "&:hover": {
                "& svg": {
                  color: "rgb(94, 234, 212)",
                },
              },
              ...(item?.id === "email"
                ? {
                    "& svg": {
                      cursor: "pointer",
                      height: "150%",
                      width: "150%",
                      position: "relative",
                      top: "-6px",
                      left: "-3px",
                    },
                  }
                : {}),
            }}
          >
            {item?.icon()}
          </Box>
        ))}
      </Box>
    );
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={6}
      className="GRID_ITEM_1"
      sx={{
        height: {
          xs: "fit-content",
          md: "100vh",
        },
        position: {
          md: "sticky",
        },
        top: "0",
        paddingTop: {
          xs: 10,
          md: 12,
        },
      }}
    >
      <motion.div
        initial={small ? { opacity: 1 } : { opacity: 0 }}
        animate={controls}
        transition={{ duration: Animation.duration, delay: Animation.delay }}
        onViewportEnter={() => {
          controls.start({ opacity: 1 });
        }}
      >
        <Box pt={2}>
          <Typography variant="h1">Conner McKenna</Typography>
          <TypeAnimation
            key={typingAnimationKey}
            sequence={[
              "Software Engineer",
              typingDelay,
              "Full Stack Developer",
              typingDelay,
              "Frontend Engineer",
              typingDelay,
              "Tech Lead",
              typingDelay,
              "Code Enthusiast",
              typingDelay,
              "Artist",
              typingDelay,
            ]}
            wrapper="span"
            speed={25}
            style={{
              fontSize: "2em",
              display: "inline-block",
            }}
            repeat={Infinity}
          />
          {renderList()}
          {renderSocials()}
        </Box>
      </motion.div>
    </Grid>
  );
};

export const StickySectionHeader = ({ children, sx }) => {
  return (
    <Box
      sx={{
        height: "60px",
        width: "97vw",
        position: "sticky",
        top: "0",
        marginLeft: "-48px",
        paddingLeft: "48px",
        zIndex: 5000,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        borderBottomColor: "rgb(229, 231, 235)",
        alignItems: "center",
        marginBottom: "1rem",
        display: {
          xs: "flex",
          md: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const About = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
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

const Experience = () => {
  const inView = useSectionContext()?.activeSection === Sections.Details;
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

const Details = memo(() => {
  const inView = useSectionContext((state) => state.activeSection) === "About";
  const controls = useAnimation();
  const bp = useBreakPoint();
  // console.log("bp:", bp);

  useEffect(() => {
    if (!inView) {
      controls.start({ opacity: 0 });
    }
  }, [inView]);

  return (
    <StyledGrid
      container
      className="GRID_CONTAINER"
      sx={{
        minHeight: "100vh",
        // backgroundColor: {
        //   xs: "red",
        //   sm: red[100],
        //   md: blue[500],
        //   lg: green[500],
        //   xl: "purple",
        // },
      }}
    >
      <StickyHeader />
      <Grid
        item
        xs={12}
        md={6}
        className="GRID_ITEM"
        mb={12}
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <About />
        <Experience />
        <br />
        <br />
        <br />
        <Toolkit />
      </Grid>
    </StyledGrid>
  );
});

export default Details;
