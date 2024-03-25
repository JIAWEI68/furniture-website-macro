import { useState, useEffect } from "react";
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  useToast,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
import { rootUri } from "/apis/api";
import { Link } from "react-router-dom";

const LoginAndRegisterModal = () => {
  const toast = useToast();
  const id = "toast";
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const handleClick = () => setShow(!show);
  const [signUp, setSignUp] = useState(false);
  const [isErrorF, setIsErrorF] = useState(false);
  const [isErrorL, setIsErrorL] = useState(false);
  const [isErrorE, setIsErrorE] = useState(false);
  const [isErrorP, setIsErrorP] = useState(false);




  const login = async () => {
    try {
      const result = await fetch(`${rootUri}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for CORS support to work
          "Allow-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await result.json();
      if (data.result === "login successful") {
        sessionStorage.setItem("id", data.id);
        if (!toast.isActive(id)) {
          toast({
            title: "Login Successful",
            id,
            description: "Welcome to the furniture store",
            status: "success",
            duration: 5000,
            isClosable: true,
            onCloseComplete: () => {
              window.location.href = "/";
            },
          });
        }
      } else if (
        data.result === "incorrect password" ||
        data.result === "incorrect username or password"
      ) {
        if (!toast.isActive(id)) {
          toast({
            title: "Login Failed",
            id,
            description: data.result,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async () => {
    if (firstName === "") {
      setIsErrorF(true);
    }
    if (lastName === "") {
      setIsErrorL(true);
    }
    if (email === "") {
      setIsErrorE(true);
    }
    if (password === "") {
      setIsErrorP(true);
    }
    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
      try {
        const result = await fetch(`${rootUri}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Required for CORS support to work
            "Allow-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        });
        const data = await result.json();
        console.log(data);
        toast({
          title: "Registration Successful",
          id,
          description: "Welcome to the furniture store",
          status: "success",
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => {
            window.location.href = "/";
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const changeStatus = () => {
    setSignUp(false)
    setIsErrorF(false)
    setIsErrorL(false)
    setIsErrorE(false)
    setIsErrorP(false)
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <Container>
          <ModalHeader paddingLeft={0}>Welcome</ModalHeader>
          <ModalCloseButton />
          {
            signUp ?
              <Container paddingLeft={0}>
                <FormControl isInvalid={isErrorF}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="name" onChange={(e) => setfirstName(e.target.value)} />
                </FormControl>
                {
                  isErrorF ?
                    <Container paddingLeft={0}>
                      <Text color={"red"}>Please enter your first name</Text>
                    </Container> :
                    <></>
                }
                <FormControl isInvalid={isErrorL}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="name" onChange={(e) => setlastName(e.target.value)} />
                  {
                    isErrorL ?
                      <Container paddingLeft={0}>
                        <Text color={"red"}>Please enter your last name</Text>
                      </Container> :
                      <></>
                  }
                </FormControl>
                <FormControl isInvalid={isErrorE}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                  {
                    isErrorE ?
                      <Container paddingLeft={0}>
                        <Text color={"red"}>Please enter your email</Text>
                      </Container> :
                      <></>
                  }
                </FormControl>
                <FormControl isInvalid={isErrorP}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={handleClick}
                        icon={show ? <ViewIcon /> : <ViewOffIcon />}
                        background={"none"}
                        _hover={"none"}
                        _active={{
                          background: "none"
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {
                    isErrorP ?
                      <Container paddingLeft={0}>
                        <Text color={"red"}>Please enter your password</Text>
                      </Container> :
                      <></>
                  }
                </FormControl>
              </Container> :
              <Container paddingLeft={0}><FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={handleClick}
                        icon={show ? <ViewIcon /> : <ViewOffIcon />}
                        background={"none"}
                        _hover={"none"}
                        _active={{
                          background: "none"
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl></Container>
          }

          <ModalFooter justifyContent={"center"}>
            <VStack>
              {
                signUp ?
                  <Center paddingTop={3}>
                    <Button onClick={register}>Sign up</Button>
                  </Center> :
                  <Center paddingTop={3}>
                    <Button onClick={login}>Login</Button>
                  </Center>
              }
              {
                signUp ?
                  <Container>
                    <Text>
                      Already have an account? {''}
                      <Link style={
                        {
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }
                      } onClick={changeStatus}>
                        Log in
                      </Link>
                    </Text>
                  </Container> :
                  <Container>
                    <HStack>
                      <Text>
                        New to MacroWebsite? {''}
                      </Text>
                      <Link style={
                        {
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }
                      } onClick={(e) => setSignUp(true)}>
                        Sign Up
                      </Link>
                    </HStack>
                  </Container>
              }
            </VStack>
          </ModalFooter>
        </Container>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginAndRegisterModal;
