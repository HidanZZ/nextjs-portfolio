import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="absolute" left="0" top="0" w="full" zIndex={9999}>
      <Flex
        bg="transparent"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        position={{ base: "relative", md: "auto" }}
        py={{ base: 4 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          position={{ base: "absolute", md: "relative" }}
          left={{ base: "50%", md: "auto" }}
          flex={{ base: 1 }}
          justify={{ base: "center", md: "space-between" }}
        >
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Heading
            position={{ base: "relative", md: "absolute" }}
            left={{ base: "auto", md: "50%" }}
            transform="translateX(-50%)"
            as="h1"
            size="lg"
            letterSpacing={"tight"}
          >
            HIDANZ
          </Heading>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const ref = useRef(null);
  const pathMotion = {
    rest: { d: "M 30 4 L 90 4", opacity: 0 },
    hover: {
      opacity: 1,
      scale: 1.5,
      d: ["M 30 4 L 90 4", "M 30 7 L 90 3", "M 30 3 L 90 7", "M 30 4 L 90 4"],
    },
  };
  const linkMotion = {
    rest: { scale: 1 },
    hover: {
      scale: 1.2,
    },
    transition: {
      duration: 1,
    },
  };

  return (
    <Stack zIndex={999} direction={"row"} spacing={10}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover w="20px" trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                ref={ref}
                as={motion.div}
                href={navItem.href ?? "#"}
                position="relative"
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Box
                  as={motion.div}
                  fontSize={"md"}
                  fontWeight={500}
                  textAlign="center"
                  p={2}
                  variants={linkMotion}
                  color={linkColor}
                >
                  {navItem.label}
                </Box>

                <Box as={motion.div} zIndex={99} position="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // style={{ verticalAlign: "top", display: "inline" }}
                    viewBox="0 0 150 150"
                    width="100%"
                  >
                    <motion.path
                      variants={pathMotion}
                      // d="38 74.707l24.647 24.646L116.5 45.5"
                      d="M 30 4 L 90 4"
                      // animate={{
                      //   d: [
                      //     "M 10 4 L 90 4",
                      //     "M 10 7 L 90 3",
                      //     "M 10 3 L 90 7",
                      //     "M 10 4 L 90 4",
                      //   ],
                      // }}
                      // transition={{
                      //   repeat: Infinity,
                      //   ease: "easeInOut",
                      //   duration: 6,
                      // }}
                      fill="transparent"
                      strokeWidth="5"
                      stroke={useColorModeValue("gray", "white")}
                      strokeLinecap="round"

                      // transition={{ duration: 3 }}
                    />
                  </svg>
                </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <AnimatePresence exitBeforeEnter initial={false}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", duration: 2 }}
                >
                  <PopoverContent
                    as={motion.div}
                    border={0}
                    boxShadow={"xl"}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                </motion.div>
              </AnimatePresence>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Works",
  },
  {
    label: "About",
    href: "/posts",
  },
  {
    label: "Contact",
    href: "#",
  },
];
