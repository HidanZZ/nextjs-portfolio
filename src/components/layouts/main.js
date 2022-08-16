import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NavBar from "../NavBar";
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
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Portfilio</title>
        </Head>
        <NavBar />
        <Box w="full" maxW="100vw">
          {props.children}
        </Box>
        <Footer></Footer>
      </motion.div>
    </Box>
  );
};
export default Main;
