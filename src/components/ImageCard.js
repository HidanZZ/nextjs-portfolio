import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

const ImageCard = ({ image, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.25,
  });
  const variants = {
    enter: (index) => {
      return {
        x: (index + 1) * 120,
      };
    },
    center: (index) => {
      return {
        x: 0,
      };
    },
  };
  return (
    <Box
      ref={ref}
      as={motion.div}
      backgroundColor="#f8f1f1"
      borderRadius="lg"
      width="100%"
      height="100%"
      overflow="hidden"
      variants={variants}
      custom={index}
      initial="enter"
      animate={inView ? "center" : "enter"}
      transition={{
        type: "spring",
        stiffness: 300,
        delay: 1.5,
      }}
    >
      <Box
        as={motion.img}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
        src={image}
        draggable={false}
        alt="card"
      />
    </Box>
  );
};
export default ImageCard;
