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
    white: "#fff",
    black: "#1A202C",
    lightGreen: "#00AAA0",
    green: "#318680",
    beige: "#F3EADA",
    darkGreen: "#0C1713",
    darkPink: "#AB4967",
    pink: "#A04668",
    lightPink: "#BC8DA0",
    lavender: "#D9D0DE",
  },
  styles: {
    body: {
      color: "white",
      backgroundColor: "black",
    },
  },
});

export default theme;
