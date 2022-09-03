import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import "../css/global.css";
import Script from "next/script";
import { useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "../analytics";
const App = ({ Component, pageProps, router }) => {
  // useEffect(() => {
  //   initGA();
  //   logPageView();
  //   Router.events.on("routeChangeComplete", logPageView);
  // }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <ChakraProvider theme={theme}>
        <Main
        //pass the loaded state to the main component
        >
          <Component {...pageProps} key={router.route}></Component>
        </Main>
      </ChakraProvider>
    </>
  );
};
export default App;
