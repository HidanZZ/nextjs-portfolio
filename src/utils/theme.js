import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    white: "#D6E9E7",
    black: "#1A202C",
    green: "#318680",
  },
  styles: {
    body: {
      color: "white",
      backgroundColor: "black",
    },
  },
});

export default theme;
