import { Box, Stack, Flex, chakra, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import WorkCards from "./WorkCards";
const Work = (props) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const [titleRef, inViewTitle] = useInView({
    threshold: 0.1,
  });
  const wrapperVariants = {
    initial: {
      backgroundColor: "#1A202C",
    },
    animate: {
      backgroundColor: ["#1A202C", "#D6E9E7"],
    },
  };
  return (
    <Box
      {...props}
      ref={ref}
      as={motion.div}
      variants={wrapperVariants}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      transition={{
        ease: "easeInOut",
        delay: 1.5,
      }}
      minH="100vh"
      w="full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // position: "relative",
        // display: "grid",
        // placeItems: "center",
      }}
      // justify={"space-between"}
      // align="center"
      // flex={1}
      // flexDirection="column"
      p={4}
    >
      <chakra.h1
        ref={titleRef}
        as={motion.div}
        mt={8}
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
        color="green"
      >
        Works
      </chakra.h1>

      <WorkCards
        style={{
          overflow: "hidden",

          width: "100vw",
          height: "100vh",
          position: "absolute",
          display: "grid",
          placeItems: "center",
        }}
        y={titleRef.current?.clientHeight}
      ></WorkCards>
      <Button
        {...props}
        p={8}
        mb={8}
        bg={"#151f21"}
        color="white"
        fontSize={"2xl"}
        fontWeight={"bold"}
        backgroundColor="green"
        width={{ base: "full", md: "auto" }}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        More works
      </Button>
    </Box>
  );
};
export default Work;
