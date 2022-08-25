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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Fiverr } from "@styled-icons/simple-icons";
import { useState } from "react";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { useInView } from "react-intersection-observer";

export default function ContactFormWithSocialButtons(props) {
  const { hasCopied, onCopy } = useClipboard("example@example.com");
  const [socialRef, inViewSocial] = useInView({
    threshold: 0.1,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Flex
      {...props}
      minH="100vh"
      minW={"100%"}
      align="center"
      justify="center"
      ref={props.innerRef}
      backgroundColor="transparent"
    >
      <Box
        borderRadius="lg"
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

                <Link href="#">
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

                <Link href="#">
                  <IconButton
                    aria-label="twitter"
                    variant="ghost"
                    size="lg"
                    icon={<Fiverr size={28} />}
                    _hover={{
                      bg: "white",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Link>

                <Link href="#">
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
                bg={"transparent"}
                borderRadius="lg"
                p={{ base: 6, md: 8 }}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
                shadow="base"
              >
                <VStack spacing={{ base: 2, md: 5 }}>
                  <FormControl
                    isInvalid={() => {
                      if (name.length < 1) {
                        return true;
                      } else {
                        return false;
                      }
                    }}
                    isRequired
                  >
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
                  </FormControl>

                  <FormControl
                    isInvalid={() => {
                      //validate email
                      if (email.length < 1) {
                        return true;
                      } else if (isValidEmail(email)) {
                        return true;
                      } else {
                        return false;
                      }
                    }}
                    isRequired
                  >
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
                  </FormControl>

                  <FormControl
                    isInvalid={() => {
                      if (message.length < 100) {
                        return true;
                      } else {
                        return false;
                      }
                    }}
                    isRequired
                  >
                    <FormLabel>Message</FormLabel>

                    <Textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={6}
                      resize="none"
                    />
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: "blue.500",
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
