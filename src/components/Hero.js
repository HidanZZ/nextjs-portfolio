import { Box } from "@chakra-ui/react";

import { motion, useAnimationControls, useInView } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import ScrollAnimation from "./ScrollAnimation";
import HeroText from "./HeroText";
export default function Hero(props) {
  const heroTextRef = useRef();

  const handleWheel = (e) => {
    heroTextRef.current.handleScroll(e);
  };
  const onTouchEnd = (e) => {
    heroTextRef.current.onTouchEnd(e);
  };
  const onTouchStart = (e) => {
    heroTextRef.current.onTouchStart(e);
  };
  const onTouchMove = (e) => {
    heroTextRef.current.onTouchMove(e);
  };

  return (
    <Box
      as={motion.div}
      {...props}
      // onWheel={handleWheel}
      // onTouchEnd={onTouchEnd}
      // onTouchStart={onTouchStart}
      // onTouchMove={onTouchMove}
      minH="100vh"
      w="full"
    >
      <Box position={"relative"} minW="full" minH="100vh">
        {props.children}
        <HeroText ref={heroTextRef}></HeroText>

        <ScrollAnimation />
      </Box>
    </Box>
  );
}
