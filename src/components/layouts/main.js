import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
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
  //on first render

  return (
    <Box>
      <AnimatePresence>
        {!props.loaded && (
          <Box
            as={motion.div}
            initial={{ top: "0" }}
            animate={{ top: "0" }}
            exit={{ top: "-100vh", transition: { duration: 1 } }}
            w={"100vw"}
            h={"100vh"}
            position="fixed"
            top={0}
            left={0}
            display="flex"
            justify="center"
            align="center"
            zIndex={9999}
            backgroundColor={"black"}
          >
            <ThreeDotsWave />
          </Box>
        )}
      </AnimatePresence>
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
