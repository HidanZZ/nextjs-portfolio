import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../utils/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          ></link>
          <link rel="manifest" href="favicon/site.webmanifest"></link>
        </Head>
        <body
          style={{
            overflowX: "hidden",
          }}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
