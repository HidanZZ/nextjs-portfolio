import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { useEffect, useState } from "react";
import "../css/global.css";
const App = ({ Component, pageProps, router }) => {
  const [loaded, setLoaded] = useState(true);
  const { rive, RiveComponent } = useRive({
    src: "hero-animation.riv",
    autoplay: true,
    stateMachines: "scene",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      console.log("loaded");
      setTimeout(() => setLoaded(true), 1000);
    },
  });
  useEffect(() => {
    if (router.pathname != "/") {
      setTimeout(() => setLoaded(true), 1000);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Main
        //pass the loaded state to the main component
        loaded={loaded}
      >
        <Component {...pageProps} key={router.route}>
          <RiveComponent style={{ minHeight: "100vh" }} />
        </Component>
      </Main>
    </ChakraProvider>
  );
};
export default App;
