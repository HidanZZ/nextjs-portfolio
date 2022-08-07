import { AnimatePresence, motion, useAnimation } from "framer-motion";
import AnimatedCharacters from "./AnimatedText";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
const HeroText = forwardRef((_, ref) => {
  const [placeholderTextIndex, setPlaceHolderTextIndex] = useState(0);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [next, setNext] = useState(true);
  const placeholderText = [
    [
      { type: "heading1", text: "Hello World" },
      {
        type: "heading1",
        text: "My name is Hidanz",
      },
    ],
    [
      { type: "heading1", text: "I am a software engineer" },
      {
        type: "heading1",
        text: "I have a passion for building things",
      },
    ],
    [
      {
        type: "heading1",
        text: "Experienced in web, mobile and game development",
      },
    ],
    [
      {
        type: "heading1",
        text: "Let me show you my work",
      },
    ],
  ];
  useEffect(() => {
    setTimeout(() => {
      setIsAnimationPlaying(false);
    }, 1.8 * 1000);
  }, []);

  useEffect(() => {
    if (isAnimationPlaying) {
      setTimeout(() => {
        setIsAnimationPlaying(false);
      }, 1.8 * 1000);
    }
  }, [isAnimationPlaying]);

  const handleScroll = (e) => {
    if (!isAnimationPlaying) {
      if (e.deltaY > 0) {
        if (placeholderTextIndex < placeholderText.length - 1) {
          setNext(true);
          setPlaceHolderTextIndex(placeholderTextIndex + 1);
        }
      } else {
        if (placeholderTextIndex > 0) {
          setNext(false);
          setPlaceHolderTextIndex(placeholderTextIndex - 1);
        }
      }
      setIsAnimationPlaying(true);
    }
  };

  useImperativeHandle(ref, (e) => ({
    handleScroll: handleScroll,
  }));
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };
  return (
    <AnimatePresence>
      {placeholderText.map((list, index) => {
        return (
          placeholderTextIndex === index && (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              initial={next ? "hidden" : "exit"}
              //   animate="visible"
              exit={next ? "exit" : "hidden"}
              animate={"visible"}
              variants={container}
            >
              <div>
                {list.map((item, index) => {
                  return <AnimatedCharacters {...item} key={index} />;
                })}
              </div>
            </motion.div>
          )
        );
      })}
    </AnimatePresence>
  );
});
export default HeroText;
