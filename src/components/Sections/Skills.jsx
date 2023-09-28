import { Html } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../section";
import { motion } from "framer-motion";
import { useThree } from "@react-three/fiber";
import { NewMacbook } from "../NewMacbook";

const skills = [
  {
    title: "React",
    level: 100,
  },
  {
    title: "Nodejs",
    level: 100,
  },
  {
    title: "HTML & CSS",
    level: 100,
  },
  {
    title: "Rest APIs",
    level: 100,
  },
  {
    title: "TypeScript",
    level: 70,
  },
  {
    title: "Docker",
    level: 40,
  },
  {
    title: "Kubernetes",
    level: 30,
  },
  {
    title: "React Native",
    level: 30,
  },
  {
    title: "Java",
    level: 20,
  },
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
            {/* <NewMacbook inView={inView} inView2={inView2} /> */}
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
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default Skills;
