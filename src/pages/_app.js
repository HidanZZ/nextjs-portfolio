import { ChakraProvider, chakra } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../utils/theme";
import "../css/global.css";
import "../css/styles.scss";
import Script from "next/script";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const App = ({ Component, pageProps, router }) => {
  useEffect(() => {
    controls.start("animate");
  }, []);
  const controls = useAnimation();
  const variants = {
    initial: {
      top: "50%",
    },
    animate: {
      top: "-50%",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  return (
    <>
      <chakra.div
        variants={variants}
        initial="initial"
        animate={controls}
        as={motion.div}
        id="globalLoader"
      >
        <div className="loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </chakra.div>
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
