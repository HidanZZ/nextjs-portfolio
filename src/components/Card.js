import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const cardVariant = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
    },
  },
};

const Card = ({
  title,
  subtitle,
  titleColor = "white",
  subtitleColor = "white",
  borderBottomColor = "#E33C36",
  iconName,
  iconSize = 2,
  iconColor = "white",
  bgPhoto,
  tag,
  tagColor = "white",
  tagBg = "#E33C36",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <chakra.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={cardVariant}
      as={motion.div}
      width={"280px"}
      height={"380px"}
      backgroundSize={"cover"}
      backgroundImage={bgPhoto}
      borderRadius={"8px"}
      boxShadow={"0 3px 8px 0 rgba(0, 0, 0, 0.08)"}
      backgroundPosition={"center center"}
    >
      <chakra.div
        bg={"rgba(0, 0, 0, 0.5)"}
        w="100%"
        h="100%"
        pos={"relative"}
        borderRadius={"8px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"20px"}
        borderBottom={`5px solid ${borderBottomColor}`}
      >
        <chakra.div
          as={motion.div}
          animate={isHovered ? { height: "100%" } : { height: "0" }}
          pos={"absolute"}
          bottom={"0"}
          zIndex={"10"}
          left={"0"}
          borderRadius={"8px"}
          width={"100%"}
          height={"0"}
          bg={tagBg}
        ></chakra.div>
        <chakra.div
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row-reverse"}
          width={"100%"}
        ></chakra.div>

        {(title || subtitle) && (
          <chakra.div
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            marginTop={"40px"}
            marginBottom={"20px"}
            color={"white"}
          >
            <chakra.div>
              <chakra.div display={"flex"} alignItems={"center"}>
                {title && (
                  <chakra.span
                    fontSize={"24px"}
                    fontWeight={"900"}
                    color={titleColor}
                  >
                    {title}
                  </chakra.span>
                )}
                {tag && (
                  <chakra.span
                    marginLeft={"10px"}
                    backgroundColor={tagBg}
                    color={tagColor}
                    padding={"5px 10px"}
                    borderRadius={"20px"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                  >
                    {tag}
                  </chakra.span>
                )}
              </chakra.div>
              {subtitle && (
                <chakra.span
                  marginTop={"8px"}
                  fontSize={"14px"}
                  display={"block"}
                  color={subtitleColor}
                >
                  {subtitle}
                </chakra.span>
              )}
            </chakra.div>
          </chakra.div>
        )}
      </chakra.div>
    </chakra.div>
  );
};

export default Card;
