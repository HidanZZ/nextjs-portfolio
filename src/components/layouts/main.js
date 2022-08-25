import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "../NavBar";
import Footer from "../Footer";
const Main = (props) => {
  const variants = {
    visible: { opacity: 1 },
    invisible: {
      opacity: 0,
    },
  };
  //on first render

  return (
    <Box>
      <motion.div as="main">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Hidanz portfolio</title>
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
