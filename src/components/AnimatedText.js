import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
// Word wrapper
const Wrapper = (props) => {
  // We'll do this to prevent wrapping of words using CSS
  return (
    <span style={{ whiteSpace: "nowrap" }} className="word-wrapper">
      {props.children}
    </span>
  );
};

// Map API "type" vaules to JSX tag names
const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
const AnimatedCharacters = (props) => {
  // Framer Motion variant object, for controlling animation

  //  Split each word of props.text into an array
  const splitWords = props.text.split(" ");

  // Create storage array
  const words = [];

  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0");
  });

  // Get the tag name from tagMap
  const Tag = tagMap[props.type];

  return (
    <Tag style={{ textAlign: "center" }}>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <Box
                    as={motion.span}
                    className="noselect"
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--chakra-fonts-heading)",
                      fontWeight: "bold",
                      textShadow: "0px 0px 3px #000",
                    }}
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    variants={props.item}
                    custom={props.custom}
                  >
                    {element}
                  </Box>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </Tag>
  );
};

export default AnimatedCharacters;
