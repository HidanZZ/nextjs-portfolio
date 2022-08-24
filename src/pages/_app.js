import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import "../css/global.css";
const App = ({ Component, pageProps, router }) => {
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
