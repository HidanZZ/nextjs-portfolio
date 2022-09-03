import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import "../css/global.css";
import { useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "../analytics";
const App = ({ Component, pageProps, router }) => {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Main
      //pass the loaded state to the main component
      >
        <Component {...pageProps} key={router.route}></Component>
      </Main>
    </ChakraProvider>
  );
};
export default App;
