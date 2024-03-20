import { useState, useEffect } from "react";
import { rootUri } from "/apis/api.js";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { compareSync } from "bcryptjs";

const AccountDetails = () => {
  const [user, setUser] = useState([]);
  const [editAccount, setEditAccount] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const getUser = async (id) => {
    try {
      const result = await fetch(`${rootUri}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
      });
      const data = await result.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const editUser = async () => {
    await fetch(`${rootUri}/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      }),
    })
  }


  const updatePassword = async () => {
    let flag = compareSync(oldPassword, user.password);
    if (flag === true) {
      await fetch(`${rootUri}/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          password: newPassword
        }),
      })
    }
    else {
      toast({
        title: "Error",
        description: "Old password is incorrect",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    getUser(id);
  }, []);
  return (
    <Center mt="20" mx="10" mb="-1" width="100%">
      {() => {
        if (editAccount === false && changePassword === false) {
          return (
          <Container>
            <SimpleGrid columns={2} spacing={10}>
              <Box width={30} height={10}>
                <Text>Name</Text>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </Box>
              <Box width={30} height={10}>
                <Text>Password</Text>
                <Text as="password">{user.password}</Text>
              </Box>
              <Box width={30} height={10}>
                <Text>Email</Text>
                <Text>{user.email}</Text>
              </Box>
              <Box width={30} height={10}>
                <Text>Phone Number</Text>
                <Text>{user.phoneNumber}</Text>
              </Box>
            </SimpleGrid>
            <Stack direction={"row"} spacing={2}>
              <Button onClick={(e) => setEditAccount(true)}>Edit Account</Button>
              <Button onClick={(e) => setChangePassword(true)}>
                Change Password
              </Button>
            </Stack>
          </Container>)
        } else if (editAccount === true) {
          return (
          <Container>
            <Heading size="xl">Edit Account Details</Heading>
            <SimpleGrid columns={2} spacing={10}>
              <Box width={30} height={10}>
                <Text>First Name</Text>
                <Input
                  type="name"
                  value={user.firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Box>
              <Box width={30} height={10}>
                <Text>Last Name</Text>
                <Input
                  type="name"
                  value={user.lastName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Box>
              <Box width={30} height={10}>
                <Text>Email</Text>
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box width={30} height={10}>
                <Text>Phone Number</Text>
                <Input
                  type="tel"
                  value={user.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>
            </SimpleGrid>
            <Stack direction={"row"}>
              <Button onClick={(e) => setEditAccount(false)}>Cancel</Button>
              <Button onClick={(e) => editUser()}>Save</Button>
            </Stack>
          </Container>)
        }
        else if (changePassword === true) {
          return (<Container mt="20" mx="10" mb="-1" width="100%">
            <Stack direction={"column"}>
              <Box width={30} height={10}>
                <Text>Old Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Box>
              <Box width={30} height={10}>
                <Text>New Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Box>
              <Box width={30} height={10}>
                <Text>Confirm New Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
            </Stack>
            <Stack direction={"row"}>
              <Button onClick={(e) => setChangePassword(false)}>Cancel</Button>
              <Button onClick={(e) => updatePassword()}>Save</Button>
            </Stack>
          </Container>)
        }
      }
      }
    </Center>
  )
};

export default AccountDetails;

