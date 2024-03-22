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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
import { rootUri } from "/apis/api";

const LoginModal = () => {
  const toast = useToast();
  const id = "toast";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const handleClick = () => setShow(!show);

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

  return (
    <ModalOverlay>
      <ModalContent>
        <Container>
          <ModalHeader>Welcome</ModalHeader>
          <ModalCloseButton />
          <FormControl>
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
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <ModalFooter justifyContent={"center"}>
            <Center paddingTop={3}>
              <Button onClick={login}>Login</Button>
            </Center>
          </ModalFooter>
        </Container>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
