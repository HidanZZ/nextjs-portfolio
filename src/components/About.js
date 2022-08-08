import { Box, Flex, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  return (
    <Stack minH="100vh" w="full" direction={{ base: "column", md: "row" }}>
      <Flex>
        <motion.img src="https://source.unsplash.com/random"></motion.img>
      </Flex>
    </Stack>
  );
};
export default About;
