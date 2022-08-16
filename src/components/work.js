import {
  Box,
  Stack,
  Flex,
  chakra,
  Image,
  Text,
  Button,
  Container,
} from "@chakra-ui/react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { range } from "lodash-es";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
const Work = (props) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [selected, setSelected] = useState(0);
  const [titleRef, inViewTitle] = useInView({
    threshold: 0.1,
  });
  const screens = [
    {
      title: "All",
      color: "#AB4967",
    },
    {
      title: "Games",
      color: "#A04668",
    },
    {
      title: "Apps",
      color: "#BC8DA0",
    },
    {
      title: "Web",
      color: "#D9D0DE",
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
        description: "test",
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description: "test",
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description: "test",
      },
    ],
    Apps: [
      {
        title: "test",
        category: "app",
        categoryIndex: 2,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description: "test",
      },
    ],
    Web: [
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description: "test",
      },
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description: "test",
      },
    ],
  };
  data.All = data.Games.concat(data.Apps, data.Web);
  // console.log("data", data[screens[selected].title]);
  return (
    <Box
      {...props}
      ref={ref}
      as={motion.div}
      minH="100vh"
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
        Checkout some of My <chakra.span color={"darkPink"}>Work</chakra.span>
      </chakra.h1>
      <chakra.ol
        listStyleType={"none"}
        p={0}
        m={0}
        userSelect="none"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
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
            fontWeight={"bold"}
            pos="relative"
            cursor="pointer"
            // style={{ color: i === selected ? color : "" }}
            color={i === selected ? color : "#fff"}
            onClick={() => setSelected(i)}
          >
            {i === selected && (
              <chakra.div
                as={motion.div}
                w="100%"
                h="8px"
                borderRadius="4px"
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
      <Box pos={"relative"} minW="80%" maxW={"80%"}>
        <AnimatePresence>
          <Flex
            width={"full"}
            flexGrow={1}
            as={motion.div}
            pos="absolute"
            animate={{
              transition: {
                staggerChildren: 0.25,
              },
            }}
            mt={4}
            key={selected}
            flexWrap={"wrap"}
            p={{ base: 4, md: 8 }}
            justifyContent="center"
          >
            {data[screens[selected].title].map((item, i) => (
              <Card data={item} />
            ))}
          </Flex>
        </AnimatePresence>
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
            <Card data={item} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const Card = ({ data, key }) => {
  return (
    <Flex
      userSelect={"none"}
      w="280px"
      m={4}
      as={motion.div}
      color={"gray.900"}
      bg={"white"}
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
      borderRadius={8}
      boxShadow="lg"
      direction="column"
      overflow="hidden"
    >
      <Image w="100%" src={data.image}></Image>
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
        <Box flex="1" fontWeight="600" fontSize="xs" opacity={0.5}>
          <Text>Posted by author</Text>
          <Text>Test</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Work;
