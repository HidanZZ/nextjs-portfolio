import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    body: "Raleway, monospace",
  },
  colors: {
    white: "#fff",
    black: "#191919",
    orange: "#C84B31",
    blue: "#2D4263",
    beige: "#ECDBBA",
    lightbeige: "rgba(214, 233, 231, 1)",
  },
  styles: {
    global: {
      body: {
        color: "white",
        backgroundColor: "#191919",
      },
    },
  },
});

export default theme;
