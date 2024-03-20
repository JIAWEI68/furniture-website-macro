import { useState, useEffect } from "react";
import { rootUri } from "/apis/api.js";
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  useToast
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const id = "toast"

  const register = async () => {
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
  };

  return (
    <Center>
      <Container mt="20" mx="10" mb="-1" width="100%">
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="name" onChange={(e)=> setfirstName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="name" onChange={(e)=>setlastName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                onClick={handleClick}
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Center paddingTop={3}>
          <Button onClick={(e)=>register()}>Register</Button>
        </Center>
      </Container>
    </Center>
  );
};

export default Register;
