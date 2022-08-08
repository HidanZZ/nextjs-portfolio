import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedCharacters from "./AnimatedText";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Box } from "@chakra-ui/react";
import Emitter from "../services/emitter";
const HeroText = forwardRef((_, ref) => {
  const [[placeholderTextIndex, direction], setPlaceHolderTextIndex] = useState(
    [0, 1]
  );
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const paginate = (newDirection) => {
    setPlaceHolderTextIndex((prev) => [prev[0] + 1, newDirection]);
  };
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    if (isUpSwipe || isDownSwipe)
      if (!isAnimationPlaying) {
        if (isUpSwipe) {
          if (placeholderTextIndex < placeholderText.length - 1) {
            paginate(1);
          } else {
            Emitter.emit("textAnimationFinished", true);
          }
        } else {
          if (placeholderTextIndex > 0) {
            paginate(-1);
          }
        }
        setIsAnimationPlaying(true);
      }
  };

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
  const item = {
    hidden: (direction) => {
      return {
        y: direction > 0 ? "200%" : "-200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
      };
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 2 },
    },
    exit: (direction) => {
      return {
        y: direction > 0 ? "-200%" : "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.5 },
      };
    },
  };
  useEffect(() => {
    // console.log(direction);
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
          paginate(1);
        } else {
          Emitter.emit("textAnimationFinished", true);
        }
      } else {
        if (placeholderTextIndex > 0) {
          paginate(-1);
        }
      }

      setIsAnimationPlaying(true);
    }
  };

  useImperativeHandle(ref, (e, handleTextAnimation) => ({
    handleScroll: handleScroll,
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
  }));
  const [refOne, inViewOne] = useInView({
    threshold: 0.7,
    rootMargin: `-200px`,
  });
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
            <Box
              ref={refOne}
              as={motion.div}
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              minW={{ base: "90%", md: "50%" }}
              initial={"hidden"}
              //   animate="visible"
              exit={"exit"}
              animate={inViewOne ? "visible" : "hidden"}
              variants={container}
            >
              <div>
                {list.map((element, index) => {
                  return (
                    <AnimatedCharacters
                      custom={direction}
                      {...element}
                      item={item}
                      key={index}
                    />
                  );
                })}
              </div>
            </Box>
          )
        );
      })}
    </AnimatePresence>
  );
});
export default HeroText;
