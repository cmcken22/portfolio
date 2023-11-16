import { Html } from "@react-three/drei";
import { useEffect, useRef, Suspense, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../section";
import { motion } from "framer-motion";
import { useThree } from "@react-three/fiber";
import { NewMacbook } from "../NewMacbook";
import Xarrow from "react-xarrows";
import {
  Chart as ChartJS,
  Colors,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box, Grid } from "@mui/material";

ChartJS.register(
  Colors,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function getYearsDifference(startDate, endDate) {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  let yearsDifference = endYear - startYear;

  // Check if the end date's month and day is before the start date's month and day
  if (endMonth < startMonth || (endMonth === startMonth && endDay < startDay)) {
    yearsDifference--;
  }

  return yearsDifference;
}

const startDate = new Date("2023-06-01");
const endDate = new Date();
const yearsBetween = getYearsDifference(startDate, endDate);

const skills = [
  {
    title: "React",
    years: 6 + yearsBetween,
    level: 100,
  },
  {
    title: "Nodejs",
    years: 6 + yearsBetween,
    level: 100,
  },
  {
    title: "HTML & CSS",
    years: 7 + yearsBetween,
    level: 100,
  },
  {
    title: "Rest APIs",
    years: 6 + yearsBetween,
    level: 100,
  },
  {
    title: "TypeScript",
    years: 4 + yearsBetween,
    level: 70,
  },
  {
    title: "Docker",
    years: 3 + yearsBetween,
    level: 40,
  },
  {
    title: "Kubernetes",
    years: 3 + yearsBetween,
    level: 30,
  },
  {
    title: "React Native",
    years: 1 + yearsBetween,
    level: 30,
  },
  // {
  //   title: "Java",
  //   years: 1,
  //   level: 20,
  // },
];

const Content = () => {
  return (
    <motion.div
      whileInView={"visible"}
      style={{
        backgroundColor: "blue",
        height: "100%",
        width: "100%",
        // margin: "200px",
        // padding: "96px",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "red",
              height: "100%",
              width: "100%",
            }}
          >
            <h2 className="text-5xl font-bold text-white">Skills</h2>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "blue",
              height: "1200px",
              width: "100%",
            }}
          >
            <h2 className="text-5xl font-bold text-white">Skills</h2>
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const Skills = ({ domContent, position, bgColor, scrollToPos }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const [refItem1, inView] = useInView({
    // delay: 100,
    // trackVisibility: true,
    // rootMargin: "-100px 0px",
    // root: document.querySelector("#skills"),
    initialInView: false,
    threshold: 0,
  });
  const [refItem2, inView2] = useInView({
    // delay: 100,
    // trackVisibility: true,
    // root: document.querySelector("#skills"),
    rootMargin: "1000px 0px 0px 0px",
    initialInView: false,
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  useEffect(() => {
    const pos = viewport?.factor * viewport?.height * 1;
    if (inView) {
      console.log("POS:", pos);
      scrollToPos(pos);
    }
  }, [inView, scrollToPos, viewport?.factor, viewport?.height]);

  return (
    <Section factor={1.5} offset={1}>
      <Html fullscreen portal={domContent}>
        <div
          className="container"
          ref={(r) => {
            refItem1(r);
            refItem2(r);
          }}
          style={{
            padding: 0,
            margin: 0,
            justifyContent: "unset",
          }}
        >
          <Content />
        </div>
      </Html>
    </Section>
  );
};

export default Skills;
