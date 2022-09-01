import { ExternalLinkIcon } from "@chakra-ui/icons";

import { chakra, Image, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { icons } from "../utils/icons";
import { EyeFill } from "@styled-icons/bootstrap";
import { Github } from "@styled-icons/entypo-social";
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
  borderBottomColor = "#C84B31",
  madeWith,
  bgPhoto,
  links,
  tag,
  tagColor = "#C84B31",
  tagBg = "#C84B31",
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
          borderTopRadius={"8px"}
          width={"100%"}
          height={"0"}
          bg={tagBg}
        >
          <chakra.div
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
          >
            <chakra.div
              opacity={isHovered ? 1 : 0}
              width={"100%"}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-around"}
              alignItems={"center"}
              marginTop={"40px"}
              marginBottom={"20px"}
              color={"white"}
              p={2}
            >
              <Tooltip
                bg={"black"}
                color={"white"}
                borderRadius={"8px"}
                label="Project Link"
                hasArrow
                placement="bottom"
              >
                <chakra.a
                  width="80px"
                  height="80px"
                  cursor={"pointer"}
                  href={links.website}
                  bg={hexToRgba("#C84B31", 1)}
                  borderRadius={"50%"}
                  target="_blank"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <EyeFill fill={"white"} size={50} />
                </chakra.a>
              </Tooltip>

              <Tooltip
                bg={"black"}
                color={"white"}
                borderRadius={"8px"}
                label="View on Github"
                hasArrow
                placement="bottom"
              >
                <chakra.a
                  cursor={"pointer"}
                  href={links.github}
                  width="80px"
                  height="80px"
                  target="_blank"
                  bg={hexToRgba("#C84B31", 1)}
                  borderRadius={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Github fill={"white"} size={50} />
                </chakra.a>
              </Tooltip>
            </chakra.div>
          </chakra.div>
        </chakra.div>
        <chakra.div
          pos={"absolute"}
          bottom={"0"}
          zIndex={"9"}
          left={"0"}
          borderTopRadius={"8px"}
          onClick={() => {
            console.log("clicked");
          }}
          width={"100%"}
          height={"100%"}
          bg={"transparent"}
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
                    backgroundColor={"white"}
                    color={tagColor}
                    display={"flex"}
                    flexDirection={"row"}
                    padding={"5px 10px"}
                    borderRadius={"20px"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                  >
                    {madeWith.map((item, index) => (
                      <Image
                        key={index}
                        src={icons[item]}
                        alt={item}
                        width={"20px"}
                        height={"20px"}
                        mx={1}
                      />
                    ))}
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
//hex to rgba
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export default Card;
