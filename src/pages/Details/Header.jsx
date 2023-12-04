import CustomTooltip from "components/CustomTooltip";
import { Animation, Pages, Sections, SocialLinks } from "enums";
import usePageContext from "contexts/PageContext";
import useMobile from "contexts/useMobile";
import { Box, Grid, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFlickr } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { create } from "zustand";

const sectionContext = create((set) => ({
  activeSection: "about",
  setActiveSection: (value) => set(() => ({ activeSection: value })),
}));

export const useSectionContext = () => {
  const state = sectionContext((state) => state);
  return state;
};

const typingDelay = 2000;

const Header = () => {
  const inView = usePageContext()?.activePage === Pages.Details;
  const controls = useAnimation();
  const { activeSection, setActiveSection } = useSectionContext();
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
    const elm1 = document.getElementById(Sections.About);
    const elm2 = document.getElementById(Sections.Experience);
    const elm3 = document.getElementById(Sections.Toolkit);
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

  const handleScrollToSection = useCallback((id) => {
    const elm = document.getElementById(id);
    console.clear();
    console.log("elm:", elm);
    if (elm) {
      elm.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setActiveSection(id);
  }, [setActiveSection]);

  const renderList = useCallback(() => {
    const list = [
      {
        id: Sections.About,
        label: "About",
      },
      {
        id: Sections.Experience,
        label: "Experience",
      },
      {
        id: Sections.Toolkit,
        label: "Toolkit",
      },
      {
        id: Sections.Projects,
        label: "Projects",
      },
    ];

    return (
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <ul style={{ marginTop: "4rem" }}>
          {list.map((item) => (
            <li key={item?.id}>
              <Box
                onClick={() => handleScrollToSection(item?.id)}
                py="12px"
                sx={{
                  cursor: "pointer",
                  width: "fit-content",
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
                  // href={`#${item?.id}`}
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
      </Box>
    );
  }, [handleScrollToSection, activeSection]);

  const handleOpen = useCallback((link) => {
    if (link?.indexOf("mailto") !== -1) {
      window.open(link);
    } else {
      window.open(link, "_blank");
    }
  }, []);

  const renderSocials = useCallback(() => {
    const list = [
      {
        id: "github",
        label: "Github",
        icon: () => <FaGithub />,
        link: SocialLinks.github,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: () => <FaLinkedin />,
        link: SocialLinks.linkedin,
      },
      {
        id: "flickr",
        label: "Flickr",
        icon: () => <FaFlickr />,
        link: SocialLinks.flickr,
      },
      {
        id: "email",
        label: "conner.mckenna94@gmail.com",
        icon: () => <MdAlternateEmail />,
        link: SocialLinks.email,
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
          <CustomTooltip
            key={`tooltip--${item?.id}`}
            placement="top"
            title={item?.label}
            enterDelay={500}
          >
            <Box
              key={item?.id}
              onClick={() => handleOpen(item?.link)}
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
              }}
            >
              {item?.icon()}
            </Box>
          </CustomTooltip>
        ))}
      </Box>
    );
  }, [handleOpen]);

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
        <Box>
          <Typography variant="h1">Conner McKenna</Typography>
          <TypeAnimation
            key={typingAnimationKey}
            sequence={[
              "",
              typingDelay / 2,
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
              fontFamily: "Inter",
            }}
            repeat={Infinity}
          />
          <Typography
            variant="body1"
            sx={{ marginTop: "1rem" }}
            color="primary.dark"
          >
            I build exceptional and accessible digital experiences for the web.
          </Typography>
          {renderList()}
          {renderSocials()}
        </Box>
      </motion.div>
    </Grid>
  );
};

export default Header;
