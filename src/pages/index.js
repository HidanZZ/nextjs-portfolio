// import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const Home = ({ children }) => {
  const [textAnimationFinished, SetTextAnimationFinished] = useState(false);
  const onWheel = (e) => {
    if (textAnimationFinished) {
      console.log("finished");
    }
  };
  return (
    <Box onWheel={onWheel}>
      <Hero handleTextAnimation={SetTextAnimationFinished}>{children}</Hero>
    </Box>
  );
};
export default Home;
