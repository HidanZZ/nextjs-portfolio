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
import { motion } from "framer-motion";
import AnimatedCharacters from "./AnimatedText";
import Lottie from "lottie-react";
import scrolldown from "../animations/scroll-down.json";
export default function Hero() {
  const { rive, RiveComponent } = useRive({
    src: "hero-animation.riv",
    autoplay: true,
    stateMachines: "scene",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const placeholderText = [
    { type: "heading1", text: "Hey There" },
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
  return (
    <Box
      // pos="absolute"
      minH="100vh"
      w="full"
    >
      <Box position={"relative"} minW="full" minH="100vh">
        <RiveComponent style={{ minHeight: "100vh" }} />
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
        <motion.div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            //
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 2 }}
          transition={{ duration: 0.5 }}
        >
          <Lottie
            style={{ transform: "translate(-25%,0%)" }}
            animationData={scrolldown}
            loop={true}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
