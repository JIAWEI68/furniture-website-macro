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
  const [id, setId] = useState(sessionStorage.getItem("id"))
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
      setfirstName(data[0].firstName);
      setlastName(data[0].lastName);
      setEmail(data[0].email);
      setPhoneNumber(data[0].phoneNumber);
    } catch (err) {
      console.error(err);
    }
  };

  const editUser = async () => {
    await fetch(`${rootUri}/user/updateUser/${id}`, {
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
    toast({
      title: "Account Updated",
      description: "Account details have been updated successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      onCloseComplete: () => {
        window.location.href = "/user"
      }
    })
  }

  const updatePassword = async (password) => {
    if (password == oldPassword && newPassword == confirmPassword && newPassword !== "" && confirmPassword !== "") {
      await fetch(`${rootUri}/user/changePassword/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          password: newPassword
        }),
      })
      toast({
        title: "Password Updated",
        description: "Password has been updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => {
          window.location.href = "/user"
        }
      })
    }
    else if (password !== oldPassword) {
      toast({
        title: "Error",
        description: "Old password is incorrect",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    else if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    else if (newPassword === "" && confirmPassword === "") {
      toast({
        title: "Error",
        description: "New password and confirm password cannot be empty",
        status: "error",
        duration: 9000,
        isClosable: true,
      })

    }

  }

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    getUser(id);
    console.log(user)
  }, []);

  return (
    <Center mt="20" mx="10" mb="-1" width="100%">
      {user.map((user) => {
        if (editAccount === false && changePassword === false) {
          return (<Container key={user.id}>
            <SimpleGrid columns={2} spacing={10}>
              <Box width={150} height={10}>
                <Text>Name</Text>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </Box>
              <Box width={150} height={10}>
                <Text>Password</Text>
                <Input value={window.atob(user.password)} variant="unstyled" type="password" isReadOnly />
              </Box>
              <Box width={150} height={10}>
                <Text>Email</Text>
                <Text>{user.email}</Text>
              </Box>
              <Box width={150} height={10}>
                <Text>Phone Number</Text>
                <Text>{user.phoneNumber}</Text>
              </Box>
            </SimpleGrid>
            <Stack direction={"row"} spacing={2} paddingTop={50}>
              <Button onClick={(e) => setEditAccount(true)}>Edit Account</Button>
              <Button onClick={(e) => setChangePassword(true)}>
                Change Password
              </Button>
            </Stack>
          </Container>)
        } else if (editAccount === true) {
          return (<Container key={user.id}>
            <Heading size="xl">Edit Account Details</Heading>
            <SimpleGrid columns={2} spacing={10} paddingTop={8}>
              <Box width={150} height={10}>
                <Text>First Name</Text>
                <Input
                  type="name"
                  defaultValue={user.firstName === null ? "" : user.firstName}
                  onChange={(e) => firstName === null ? setfirstName(user.firstName) : setfirstName(e.target.value)}
                  variant="flushed"
                />
              </Box>
              <Box width={150} height={10}>
                <Text>Last Name</Text>
                <Input
                  type="name"
                  defaultValue={user.lastName === null ? "" : user.lastName}
                  onChange={(e) => lastName === null ? setlastName(user.lastName) : setlastName(e.target.value)}
                  variant="flushed"
                />
              </Box>
              <Box width={150} height={10}>
                <Text>Email</Text>
                <Input
                  type="email"
                  defaultValue={user.email === null ? "" : user.email}
                  onChange={(e) => email === null ? setEmail(user.email) : setEmail(e.target.value)}
                  variant="flushed"
                />
              </Box>
              <Box width={150} height={10}>
                <Text>Phone Number</Text>
                <Input
                  type="tel"
                  defaultValue={user.phoneNumber === null ? "" : user.phoneNumber}
                  onChange={(e) => phoneNumber === null ? setPhoneNumber(user.phoneNumber) : setPhoneNumber(e.target.value)}
                  variant="flushed"
                />
              </Box>
            </SimpleGrid>
            <Stack direction={"row"} paddingTop={70}>
              <Button onClick={(e) => setEditAccount(false)}>Cancel</Button>
              <Button onClick={(e) => editUser()}>Save</Button>
            </Stack>
          </Container>)
        }
        else if (changePassword === true) {
          return (<Container key={user.id}>
            <Stack direction={"column"} spacing={10}>
              <Box width={300} height={10}>
                <Text>Old Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  variant="flushed"
                />
              </Box>
              <Box width={300} height={10}>
                <Text>New Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="flushed"
                />
              </Box>
              <Box width={300} height={10}>
                <Text>Confirm New Password</Text>
                <Input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="flushed"
                />
              </Box>
            </Stack>
            <Stack direction={"row"} paddingTop={100}>
              <Button onClick={(e) => setChangePassword(false)}>Cancel</Button>
              <Button onClick={(e) => updatePassword(window.atob(user.password, user.id))}>Save</Button>
            </Stack>
          </Container>)
        }
      })
      }
    </Center>
  )
};

export default AccountDetails;

