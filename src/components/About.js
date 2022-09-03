import { Box, Flex, Stack, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import Lottie from "lottie-react";
import animationData from "../animations/development.json";
const About = ({ innerRef, mt }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [refText, inViewText] = useInView({
    threshold: 0,
  });
  const [refImage, inViewImage] = useInView({
    threshold: 0,
  });

  return (
    <Stack
      ref={innerRef}
      mt={mt}
      minH="100vh"
      w="full"
      backgroundColor={"black"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        justify={"center"}
        flex={1}
        flexDirection="column"
        minWidth="50%"
        p={16}
      >
        <chakra.h1
          ref={ref}
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          mb={8}
          fontSize={{
            base: "5xl",
            md: "6xl",
          }}
          fontWeight="bold"
          lineHeight={{
            base: "shorter",
            md: "none",
          }}
          letterSpacing={{
            base: "normal",
            md: "tight",
          }}
          color="orange"
        >
          About
        </chakra.h1>

        <chakra.div
          mb={16}
          fontSize={{
            base: "2xl",
            md: "3xl",
          }}
          fontWeight="bold"
          lineHeight={{
            base: "shorter",
            md: "none",
          }}
          letterSpacing={{
            base: "normal",
            md: "tight",
          }}
          color="lightbeige"
        >
          <Typewriter
            options={{
              strings: ["Web Developer", "Mobile Developer", "Game Developer"],
              autoStart: true,
              loop: true,
              skipAddStyles: true,
            }}
          />
        </chakra.div>
        <chakra.p
          ref={refText}
          as={motion.p}
          initial={{ opacity: 0, x: -50 }}
          animate={inViewText ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          mb={{
            base: 10,
            md: 4,
          }}
          fontSize={{
            base: "lg",
            md: "xl",
          }}
          fontWeight={300}
          letterSpacing="wider"
          color={"lightbeige"}
        >
          I’m Ait daoud El Houssein, a professional and talented Software
          Developer with design skills. I am passionate about leveraging my
          diverse backgrounds to decipher challenging problems and create
          delightful experiences. I honed my skills at Web, Mobile and Game
          development.
          <br />
          <br />I develop websites using MERN stack. I have skills in using
          design softwares like Figma. Being a diligent, hardworking and result
          oriented man, I always work towards achieving best result on each
          project I lay my hands on.
        </chakra.p>
      </Flex>
      <Flex
        justify={"center"}
        alignItems={"center"}
        minWidth={{ base: "full", lg: "50%" }}
        display={{ base: "none", lg: "flex" }}
      >
        <Box
          display="flex"
          width="60%"
          height="60%"
          // bg={"white"}
          ref={refImage}
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={inViewImage ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          borderRadius="10%"
          justifyContent="center"
          alignItems="center"
        >
          <Lottie animationData={animationData} loop={true} />;
        </Box>
      </Flex>
    </Stack>
  );
};
export default About;
