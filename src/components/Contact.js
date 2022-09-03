import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  chakra,
  FormErrorMessage,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SiFiverr } from "react-icons/si";

import { useState } from "react";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { useInView } from "react-intersection-observer";

export default function ContactFormWithSocialButtons({ innerRef, mt }) {
  const { hasCopied, onCopy } = useClipboard("hidanzaitdaoud@gmail.com");
  const [socialRef, inViewSocial] = useInView({
    threshold: 0.1,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isnameInvalid, setIsnameInvalid] = useState(false);
  const [isemailInvalid, setIsemailInvalid] = useState(false);
  const [ismessageInvalid, setIsmessageInvalid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      name,
      email,
      message,
    };

    //validate fields
    if (name === "") {
      setIsnameInvalid(true);
    } else {
      setIsnameInvalid(false);
    }
    if (email === "") {
      setIsemailInvalid(true);
    } else if (!isValidEmail(email)) {
      setIsemailInvalid(true);
    } else {
      setIsemailInvalid(false);
    }
    if (message === "") {
      setIsmessageInvalid(true);
    } else {
      setIsmessageInvalid(false);
    }
    if (name !== "" && email !== "" && message !== "") {
      setIsnameInvalid(false);
      setIsemailInvalid(false);
      setIsmessageInvalid(false);
      fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          setName("");
          setEmail("");
          setMessage("");
        }
      });
    }
  };
  return (
    <Flex
      minH="100vh"
      minW={"100%"}
      align="center"
      justify="center"
      ref={innerRef}
      mt={mt}
      backgroundColor="transparent"
    >
      <Box
        borderRadius="lg"
        width={"100%"}
        m={{ base: 5, md: 16, lg: 10 }}
        mt={{ base: 24, md: 0 }}
        p={{ base: 5, lg: 16 }}
      >
        <Box>
          <VStack spacing={{ base: 2, sm: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: "3xl",
                sm: "4xl",
                md: "5xl",
              }}
            >
              Contact <chakra.span color="orange">Us</chakra.span>
            </Heading>

            <Stack
              spacing={{ base: 2, sm: 4, md: 8, lg: 20 }}
              direction={{ base: "column", md: "row" }}
              width={{ base: "100%", md: "70%", lg: "50%" }}
            >
              <Stack
                ref={socialRef}
                as={motion.div}
                initial={{ opacity: 0, x: -100 }}
                animate={
                  inViewSocial ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
                }
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                align="center"
                justify="space-around"
                direction={{ base: "row", md: "column" }}
              >
                <Tooltip
                  label={hasCopied ? "Email Copied!" : "Copy Email"}
                  closeOnClick={false}
                  hasArrow
                >
                  <IconButton
                    aria-label="email"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<MdEmail />}
                    _hover={{
                      bg: "white",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    onClick={onCopy}
                    isRound
                  />
                </Tooltip>

                <Link target={"_blank"} href="https://github.com/HidanZZ">
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<BsGithub />}
                    _hover={{
                      bg: "white",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Link>

                <Link target={"_blank"} href="https://www.fiverr.com/hidanz">
                  <IconButton
                    aria-label="fiverr"
                    variant="ghost"
                    size="lg"
                    icon={<SiFiverr size={28} />}
                    _hover={{
                      bg: "white",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Link>

                <Link
                  target={"_blank"}
                  href="linkedin.com/in/houssein-aitdaoud/"
                >
                  <IconButton
                    aria-label="linkedin"
                    variant="ghost"
                    size="lg"
                    icon={<BsLinkedin size="28px" />}
                    _hover={{
                      bg: "white",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Link>
              </Stack>

              <Box
                bg={"gray.700"}
                borderRadius="lg"
                p={{ base: 6, md: 8 }}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
                shadow="base"
                width={"100%"}
              >
                <VStack spacing={{ base: 2, md: 5 }}>
                  <FormControl isInvalid={isnameInvalid} isRequired>
                    <FormLabel>Name</FormLabel>

                    <InputGroup>
                      <InputLeftElement children={<BsPerson />} />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Name invalid</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={isemailInvalid} isRequired>
                    <FormLabel>Email</FormLabel>

                    <InputGroup>
                      <InputLeftElement children={<MdOutlineEmail />} />
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                      />
                    </InputGroup>

                    <FormErrorMessage>Email invalid</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={ismessageInvalid} isRequired>
                    <FormLabel>Message</FormLabel>

                    <Textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={6}
                      resize="none"
                    />
                    <FormErrorMessage>Message invalid</FormErrorMessage>
                  </FormControl>

                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    py={6}
                    width={"100%"}
                    bg="orange"
                    color="white"
                    _hover={{
                      bg: "white",
                      color: "orange",
                    }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
function isValidEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
