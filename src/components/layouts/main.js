import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar";
import WithSubnavigation from "../nav";
import Footer from "../Footer";
const Main = ({ children, router }) => {
  return (
    <Box as="main" position="relative">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfilio</title>
      </Head>
      {/* <Navbar path={router.asPath}></Navbar> */}
      <WithSubnavigation></WithSubnavigation>
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            width: "20px",
          },

          /* Track */
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "10px",
          },

          /* Handle */
          "&::-webkit-scrollbar-thumb": {
            background: "red",
            borderRadius: "10px",
          },
        }}
        w="full"
        maxW="100vw"
      >
        {children}
      </Box>
      {/* <Footer></Footer> */}
    </Box>
  );
};
export default Main;
