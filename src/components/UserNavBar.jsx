import {
    Box, HStack, useColorModeValue, Flex, useDisclosure, IconButton, MenuItem,
    Menu,
    MenuButton,
    MenuList,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    VStack
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import LoginModal from "./LoginAndRegisterModal";


const UserNavbar = () => {
    const [Links, setLinks] = useState([
        {
          name: "Sofa", link: "/Sofa", children: [{
            name: "Sofa1",
            link: "/Sofa1",
          }, {
            name: "Sofa2",
            link: "/Sofa2",
          }, {
            name: "Sofa3",
            link: "/Sofa3",
          }]
        },
        { name: "Bed", link: "/Bed", children: [{ name: "Bed1", link: "/Bed1" }, { name: "Bed2", link: "/Bed2" }, { name: "Bed3", link: "/Bed3" }] },
        {
          name: "Table", link: "/Table", children: [
            { name: "Table1", link: "/Table1" },
            { name: "Table2", link: "/Table2" },
            { name: "Table3", link: "/Table3" },
          ]
        },
        {
          name: "Chair", link: "/Chair", children: [{
            name: "Chair1",
            link: "/Chair1",
          }, {
            name: "Chair2",
            link: "/Chair2",
          }, {
            name: "Chair3",
            link: "/Chair3",
    
          }]
        },
      ]);
    const navigate = useNavigate();

    const logOut = async () => {
        sessionStorage.removeItem("id");
        navigate("/");
        window.location.reload();
    }

    const accountPage = () => {
        navigate("/user");
    }

    return (
        <Box
            bg={useColorModeValue("gray.100", "gray.900")}
            width="100%"
            height="53px"
            position={"fixed"}
            top={0}
            zIndex={1}
        >
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <HStack spacing={8} alignItems={"center"}>
                    <Box paddingLeft={5}>
                        <Link to="/">MacroWebsite</Link>
                    </Box>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        {Links.map((link) => (
                            <Box key={link.name}>
                                <Popover trigger={'hover'} matchWidth={true} key={link.name} >
                                    <PopoverTrigger>
                                        <NavLink to={link.link} state={link.name}>
                                            {link.name}
                                        </NavLink>
                                    </PopoverTrigger>
                                    <PopoverContent size="md">
                                        <PopoverHeader fontWeight="bold">{link.name}</PopoverHeader>
                                        {
                                            link.children.map((child) => (
                                                <PopoverBody key={child}>
                                                    <Link to={child.link} state={child.name} >
                                                        {child.name}
                                                    </Link>
                                                </PopoverBody>
                                            ))
                                        }
                                    </PopoverContent>
                                </Popover>
                            </Box>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={"center"} paddingRight={100}>
                    <Popover trigger={'hover'}>
                        <PopoverTrigger>
                            <IconButton icon={<CiUser />} borderRadius={0} background={"none"} onClick={accountPage} _hover={"none"}
                                _active={{
                                    background: "none"
                                }} />
                        </PopoverTrigger>
                        <PopoverContent size="xs" minWidth={5} width={150}>
                            <PopoverBody>
                                <VStack spacing={1} padding={0}>
                                    <Link to="/user">
                                        Account
                                    </Link>
                                    <Link onClick={() => logOut()}>
                                        Logout
                                    </Link>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserNavbar;
