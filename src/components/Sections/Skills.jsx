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
    <motion.div whileInView={"visible"}>
      <h2 className="text-5xl font-bold text-white">Skills</h2>
      <div className="mt-8 space-y-4">
        {skills.map((skill, index) => (
          <div className="w-64" key={index}>
            <motion.h3
              className="text-xl font-bold text-white text-left"
              initial={{
                opacity: 0,
              }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 1 + index * 0.2,
                  },
                },
              }}
            >
              {skill.title}
            </motion.h3>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
              <motion.div
                className="h-full rounded-full "
                style={{ width: `${skill.level}%`, background: "#11151c" }}
                initial={{
                  scaleX: 0,
                  originX: 0,
                }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        <h2 className="text-5xl font-bold mt-10 text-white">Languages</h2>
        <div className=" mt-8 space-y-4">
          {languages.map((lng, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-white"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 2 + index * 0.2,
                    },
                  },
                }}
              >
                {lng.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${lng.level}%`, background: "#11151c" }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </motion.div>
  );
};

const labels = skills.map((s) => s.title);
const years = skills.map((s) => s.years);
const max = Math.max(...years);
console.clear();
console.log("max:", max);

export const data = {
  labels,
  datasets: [],
  // datasets: [
  //   {
  //     label: "Years of Experience",
  //     data: years,
  //     color: "rgba(255, 255, 255, 1)",
  //     backgroundColor: "rgba(255, 99, 132, 0.2)",
  //     borderColor: "rgba(255, 99, 132, 1)",
  //     borderWidth: 1,
  //     pointBackgroundColor: "rgba(75,192,192,1)", // Color for the data points
  //     pointBorderColor: "#fff",
  //   },
  // ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
  animation: {
    duration: 2000, // Set the duration of the animation in milliseconds
    delay: 1000, // Set a delay before the animation starts in milliseconds
    easing: "easeInOutCubic", // Set the easing function for the animation
    // tension: {
    //   duration: 1000,
    //   easing: "linear",
    //   from: 1,
    //   to: 0,
    //   loop: true,
    // },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: max,
      min: 0,
      stepSize: 2,
      grid: {
        color: "rgba(255, 255, 255, 0.6)",
      },
      angleLines: {
        color: "rgba(255, 255, 255, 0.6)",
      },
      pointLabels: {
        color: "white",
        font: {
          size: 18,
        },
      },
      ticks: {
        display: false, // Set display to false to hide numerical labels
      },
      // ticks: {
      //   beginAtZero: true,
      // },
    },
  },
};

const Content2 = ({ inView }) => {
  const ref = useRef();
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Years of Experience",
        color: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(75,192,192,1)", // Color for the data points
        pointBorderColor: "#fff",
      },
    ],
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setDisplay(true);
        console.log("ref:", ref?.current);

        setData({
          labels,
          datasets: [
            {
              label: "Years of Experience",
              color: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              pointBackgroundColor: "rgba(75,192,192,1)", // Color for the data points
              pointBorderColor: "#fff",
              data: years,
            },
          ],
        });
      }, 1000);
    } else {
      setDisplay(false);
      setData({
        labels,
        datasets: [
          {
            label: "Years of Experience",
            color: "rgba(255, 255, 255, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            pointBackgroundColor: "rgba(75,192,192,1)", // Color for the data points
            pointBorderColor: "#fff",
          },
        ],
      });
    }
  }, [inView]);

  const wrapperVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { type: "easeIn", delay: 0.1, duration: 1 },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeOut" },
    },
  };

  // console.log("ref:", ref?.current);

  return (
    <motion.div
      // whileInView={"visible"}
      variants={wrapperVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      style={{
        height: "100%",
        width: "100%",
        // background: "red",
      }}
    >
      <div
        className=""
        style={{
          height: "100%",
          width: "100%",
          // background: "green",
          position: "relative",
        }}
      >
        <Radar ref={ref} data={data} options={options} />
      </div>
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

  // console.log(
  //   "inView:",
  //   [JSON.stringify(inView), JSON.stringify(inView2)],
  //   JSON.stringify(inView) === JSON.stringify(inView2)
  // );

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

  const scale = 30;

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} scale={[scale, scale, scale]}>
        <mesh ref={ref} position={[0, 0, 0]}>
          {/* <MacBook inView={inView} /> */}
          {/* <Desk inView={inView} /> */}
          <Suspense
            fallback={() => {
              console.log("UOOOOO");
            }}
          >
            <NewMacbook inView={inView} inView2={inView2} />
          </Suspense>
        </mesh>
        <Html fullscreen portal={domContent}>
          <div
            className="container"
            ref={(r) => {
              refItem1(r);
              refItem2(r);
            }}
            style={{
              margin: 0,
              justifyContent: "unset",
            }}
          >
            <Content />
            {/* <Content2 inView={inView} /> */}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default Skills;
