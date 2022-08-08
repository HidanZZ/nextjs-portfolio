// import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Work from "../components/work";
import { motion, AnimatePresence } from "framer-motion";
import Emitter from "../services/emitter";

const Home = ({ children }) => {
  const [textAnimationFinished, SetTextAnimationFinished] = useState(false);
  const [[page, direction], setPage] = useState([0, 1]);
  useEffect(() => {
    Emitter.on("textAnimationFinished", (value) => {
      if (value) {
        setPage((prev) => [prev[0] + 1, 1]);
        SetTextAnimationFinished(true);
      }
    });
    return () => {
      Emitter.off("textAnimationFinished");
    };
  }, []);
  const onWheel = (e) => {
    if (textAnimationFinished) {
      setPage((prev) => [prev[0] + 1, -1]);
    }
  };
  const item = {
    hidden: (direction) => {
      console.log("geeedd", direction);

      return {
        y: direction > 0 ? "200%" : "-200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
      };
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 2 },
    },
    exit: (direction) => {
      return {
        y: direction > 0 ? "-200%" : "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.5 },
      };
    },
  };
  return (
    <VStack scrollSnapType="x mandatory">
      <Hero
        key={0}
        // variants={item}
        // initial={"hidden"}
        // animate={"visible"}
        // exit={"exit"}
        // custom={direction}
        scrollSnapAlign="center"
      >
        {children}
      </Hero>

      <Work
        key={1}
        minH="100vh"
        scrollSnapAlign="center"
        // variants={item}
        // custom={direction}
        // initial={"hidden"}
        // animate={"visible"}
        // exit={"exit"}
      ></Work>
    </VStack>
  );
};
export default Home;
