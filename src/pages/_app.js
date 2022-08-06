import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import { RemoveScrollBar } from "react-remove-scroll-bar";
const App = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* <RemoveScrollBar /> */}
      <Main router={router}>
        <Component {...pageProps} key={router.route}></Component>
      </Main>
    </ChakraProvider>
  );
};
export default App;
