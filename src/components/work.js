import {
  Box,
  Stack,
  Flex,
  chakra,
  Image,
  Text,
  Button,
  Container,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { range } from "lodash-es";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import DevIcon from "devicon-react-svg";
import icons from "../utils/icons";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
const Work = (props) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [cardWrapperRef, inViewCardWrapper] = useInView({
    threshold: 0,
  });
  const [selected, setSelected] = useState(0);
  const [titleRef, inViewTitle] = useInView({
    threshold: 0.1,
  });
  const screens = [
    {
      title: "All",
      color: "#C84B31",
    },
    {
      title: "Games",
      color: "#C84B31",
    },
    {
      title: "Apps",
      color: "#C84B31",
    },
    {
      title: "Web",
      color: "#C84B31",
    },
  ];
  const data = {
    Games: [
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["phaser", "nodeJS"],
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot"],
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot", "nodeJS"],
      },
    ],
    Apps: [
      {
        title: "AdZone",
        category: "app",
        categoryIndex: 2,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["flutter", "nodeJS"],
      },
    ],
    Web: [
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["react", "nodeJS"],
      },
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["react", "nodeJS", "nextJS"],
      },
    ],
  };
  data.All = data.Games.concat(data.Apps, data.Web);
  // console.log("data", data[screens[selected].title]);
  return (
    <Box
      // css={{
      //   backgroundImage: props.bg,
      //   backgroundAttachment: "fixed",
      // }}
      backgroundColor={"black"}
      boxShadow={"inset 0 7px 9px -7px rgba(0,0,0,0.4)"}
      {...props}
      ref={props.innerRef}
      as={motion.div}
      minH="105vh"
      w="full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        // position: "relative",
        // display: "grid",
        // placeItems: "center",
      }}
      // justify={"space-between"}
      // align="center"
      // flex={1}
      // flexDirection="column"
      p={4}
      pt={20}
    >
      <chakra.h1
        ref={titleRef}
        as={motion.div}
        initial={{ opacity: 0, x: -100 }}
        animate={inViewTitle ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        mt={8}
        fontSize={{
          base: "3xl",
          md: "5xl",
        }}
        fontWeight="bold"
        lineHeight={{
          base: "shorter",
          md: "none",
        }}
        letterSpacing={{
          base: "normal",
          md: "tight",
        }}
        color="white"
        mb={8}
        textAlign="center"
      >
        Checkout some of My <chakra.span color={"orange"}>Work</chakra.span>
      </chakra.h1>
      <chakra.ol
        listStyleType={"none"}
        p={0}
        m={0}
        userSelect="none"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        as={motion.ol}
        ref={ref}
        initial={{ x: -100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
        }}
        style={{ transform: "translateZ(0)" }}
      >
        {screens.map(({ title, color }, i) => (
          <chakra.li
            as={motion.li}
            listStyleType={"none"}
            p={0}
            m={0}
            userSelect="none"
            animate={
              i === selected
                ? {
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    transition: { ease: "easeIn", duration: 0.2 },
                  }
                : {
                    fontSize: "1.3rem",
                    transition: { ease: "easeIn", duration: 0.2 },
                  }
            }
            // transition={{
            //   ease: "easeInOut",
            //   duration: 0.5,
            // }}

            key={i}
            // className={`title ${i === selected && "selected"}`}
            mr={{ base: 3, md: 5 }}
            pos="relative"
            cursor="pointer"
            // style={{ color: i === selected ? color : "" }}
            color={i === selected ? color : "white"}
            onClick={() => setSelected(i)}
          >
            {i === selected && (
              <chakra.div
                as={motion.div}
                w="100%"
                h="8px"
                // borderRadius="4px"
                bg="black"
                position="absolute"
                bottom="-4px"
                layoutId="underline"
                style={{ backgroundColor: color }}
              />
            )}
            {title}
          </chakra.li>
        ))}
      </chakra.ol>
      <Box mb={20} pos={"relative"} minW="80%" maxW={"80%"}>
        <Flex
          width={"full"}
          flexGrow={1}
          ref={cardWrapperRef}
          as={motion.div}
          initial={{ x: -100, opacity: 0 }}
          animate={
            inViewCardWrapper ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
          }
          pos="absolute"
          mt={4}
          key={selected}
          flexWrap={"wrap"}
          p={{ base: 4, md: 8 }}
          justifyContent="center"
        >
          <AnimatePresence>
            {data[screens[selected].title].map((item, i) => (
              <chakra.span key={i}>
                <Card data={item} />
              </chakra.span>
            ))}
          </AnimatePresence>
        </Flex>

        <Flex
          width={"full"}
          flexGrow={1}
          pos="relative"
          mt={4}
          flexWrap={"wrap"}
          p={{ base: 4, md: 8 }}
          justifyContent="center"
          visibility={"hidden"}
        >
          {data[screens[selected].title].map((item, i) => (
            <chakra.span key={i}>
              <Card data={item} />
            </chakra.span>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const Card = ({ data, cardKey }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const hoverCardVariants = {
    hover: {
      opacity: 1,
    },
  };
  return (
    <Flex
      ref={ref}
      userSelect={"none"}
      w="280px"
      m={4}
      bg={"lightbeige"}
      key={cardKey}
      as={motion.div}
      initial={{
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.5 },
      }}
      animate={{
        opacity: 1,
        transition: { ease: "easeInOut", duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.5 },
      }}
      // initial={{
      //   y: 50,
      // }}
      // animate={
      //   inView
      //     ? { scale: 1, transition: { ease: "easeInOut", duration: 0.5 } }
      //     : { scale: 0, transition: { ease: "easeInOut", duration: 0.5 } }
      // }
      color={"gray.900"}
      borderRadius={8}
      boxShadow="xl"
      direction="column"
      overflow="hidden"
    >
      <Box pos="relative" as={motion.div} whileHover="hover">
        <Image
          w="100%"
          src="https://source.unsplash.com/random/?Programming&5"
          // src={data.image}
        ></Image>
        <Box
          pos="absolute"
          w={"100%"}
          h={"100%"}
          bg="rgba(0,0,0,0.5)"
          top={0}
          left={0}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          as={motion.div}
          initial={{ opacity: 0 }}
          variants={hoverCardVariants}
        >
          <IconButton
            borderRadius={"50%"}
            color="white"
            icon={<ExternalLinkIcon />}
            _hover={{ bg: "orange" }}
          />
        </Box>
      </Box>
      <Box p={3}>
        <Text fontSize="xs" opacity={0.65}>
          {data.category}
        </Text>
        <Text fontSize="sm" fontWeight="600">
          {data.title}
        </Text>
        <Text as={motion.div} fontSize="xs" opacity={0.65} noOfLines={2}>
          {data.description}
        </Text>
      </Box>
      <Flex
        alignItems="center"
        w="100%"
        px={3}
        py={2}
        bg="rgba(0,0,0,.1)"
        borderTop="1px solid rgba(0,0,0,.1)"
      >
        {/* <Image
          h={34}
          borderRadius="999px"
          border="1px solid"
          borderColor="gray.400"
          mr={2}
          src={data.author.imageURL}
        /> */}
        <Box flex="1" fontWeight="600" fontSize="xs" opacity={0.8}>
          <Text>Made with</Text>
          <HStack>
            {data.madeWith.map((item, i) => (
              <Image h="32px" w="32px" src={icons[item]}></Image>
            ))}
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Work;
