import { Box } from "@chakra-ui/react";

import { motion, useAnimationControls } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import ScrollAnimation from "./ScrollAnimation";
import HeroText from "./HeroText";
export default function Hero({ children, handleTextAnimation }) {
  const control = useAnimationControls();
  const heroTextRef = useRef();

  const handleWheel = (e) => {
    heroTextRef.current.handleScroll(e);
  };

  return (
    <Box onWheel={handleWheel} minH="100vh" w="full">
      <Box position={"relative"} minW="full" minH="100vh">
        {children}
        <HeroText ref={heroTextRef}></HeroText>

        <ScrollAnimation />
      </Box>
    </Box>
  );
}
