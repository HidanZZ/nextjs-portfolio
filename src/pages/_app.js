import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import "../css/global.css";
import Script from "next/script";
import { useEffect } from "react";

const App = ({ Component, pageProps, router }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);
  return (
    <>
      <div id="globalLoader">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt=""
        />
      </div>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <ChakraProvider theme={theme}>
        <Main>
          <Component {...pageProps} key={router.route}></Component>
        </Main>
      </ChakraProvider>
    </>
  );
};
export default App;
