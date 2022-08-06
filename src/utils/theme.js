import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        overflow: "hidden",
      },
    }),
  },
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
