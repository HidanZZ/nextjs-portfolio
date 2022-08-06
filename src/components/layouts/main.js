import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import WithSubnavigation from "../nav";
import Footer from "../Footer";
import ThreeDotsWave from "../ThreeDotsWave";
const Main = (props) => {
  const variants = {
    visible: { opacity: 1 },
    invisible: {
      opacity: 0,
    },
  };
  return (
    <Box>
      {!props.loaded && <ThreeDotsWave />}
      <motion.div
        as="main"
        variants={variants}
        initial="invisible"
        animate={props.loaded ? "visible" : "invisible"}
        style={{
          overflow: "hidden",
          position: "relative",
          // opacity: props.loaded ? "1" : "0",
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Portfilio</title>
        </Head>
        <WithSubnavigation></WithSubnavigation>
        <Box w="full" maxW="100vw">
          {props.children}
        </Box>
        {/* <Footer></Footer> */}
      </motion.div>
    </Box>
  );
};
export default Main;
