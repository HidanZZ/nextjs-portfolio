import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedCharacters from "./AnimatedText";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
const HeroText = () => {
  const placeholderText = [
    { type: "heading1", text: "Hello World" },
    {
      type: "heading1",
      text: "My name is Hidanz",
    },
  ];
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1 },
    },
    exit: {
      y: "-200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.5 },
    },
  };

  const [ref, inView] = useInView({
    threshold: 0,
  });
  // log;
  useEffect(() => {
    console.log(inView);
  }, [inView]);

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };
  return (
    <AnimatePresence>
      <Box
        ref={ref}
        // backgroundColor="black"
        // py={10}
        // borderRadius="xl"
        as={motion.div}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        minW={{ base: "90%", md: "50%" }}
        initial={"hidden"}
        // animate="visible"
        exit={"exit"}
        animate={inView ? "visible" : "hidden"}
        variants={container}
      >
        <div>
          {placeholderText.map((element, index) => {
            return <AnimatedCharacters {...element} item={item} key={index} />;
          })}
        </div>
      </Box>
    </AnimatePresence>
  );
};
export default HeroText;
