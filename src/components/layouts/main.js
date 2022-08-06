import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar";
import WithSubnavigation from "../nav";
import Footer from "../Footer";
const Main = ({ children, router }) => {
  return (
    <Box as="main" overflow={"hidden"} position="relative">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfilio</title>
      </Head>
      <WithSubnavigation></WithSubnavigation>
      <Box w="full" maxW="100vw">
        {children}
      </Box>
      {/* <Footer></Footer> */}
    </Box>
  );
};
export default Main;
