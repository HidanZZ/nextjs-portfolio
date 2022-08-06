import {
  Button,
  Flex,
  Box,
  Heading,
  Image,
  chakra,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { motion, isValidMotionProp, useAnimation } from "framer-motion";
import AnimatedCharacters from "./AnimatedText";
import Lottie from "lottie-react";
import scrolldown from "../animations/scroll-down.json";
import { useEffect } from "react";
export default function Hero({ children, handleTextAnimation }) {
  var placeholderText = [
    { type: "heading1", text: "Hello World" },
    {
      type: "heading1",
      text: "My name is Hidanz",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });

  return (
    <Box onWheel={null} minH="100vh" w="full">
      <Box
        // opacity={loaded ? 1 : 0}
        position={"relative"}
        minW="full"
        minH="100vh"
      >
        {/* <riveComponent style={{ minHeight: "100vh" }} /> */}
        {children}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          className="App"
          initial="hidden"
          animate="visible"
          // animate={replay ? "visible" : "hidden"}
          variants={container}
        >
          <div className="container">
            {placeholderText.map((item, index) => {
              return <AnimatedCharacters {...item} key={index} />;
            })}
          </div>
        </motion.div>
        <ChakraBox
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",

            //
          }}
          display={{ base: "none", md: "block" }}
          initial={{ opacity: 0, scale: 0.5, y: "100%", x: "-25%" }}
          animate={{ opacity: 1, scale: 2, y: "0%", x: "-25%" }}
          transition={{ duration: 1.725 }}
        >
          <Lottie
            // style={{ transform: "translate(-25%,0%)" }}
            animationData={scrolldown}
            loop={true}
          />
        </ChakraBox>
      </Box>
    </Box>
  );
}
