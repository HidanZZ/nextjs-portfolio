// import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Work from "../components/work";
import { motion, AnimatePresence } from "framer-motion";
import Emitter from "../services/emitter";
import About from "../components/About";

const Home = ({ children }) => {
  return (
    <VStack>
      <Hero key={0} scrollSnapAlign="start">
        {children}
      </Hero>

      <About scrollSnapAlign="start"> </About>
    </VStack>
  );
};
export default Home;
