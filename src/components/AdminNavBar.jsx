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


const AdminNavBar = () => {
    const [Links, setLinks] = useState([
        { name: "Add Furniture", link: "/addfurniture" },
        { name: "Update Furniture", link: "/updatefurniture" }
    ]);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <Box>
                        <Link to="/">MacroWebsite</Link>
                    </Box>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        {Links.map((link) => (
                            <NavLink key={link.name} to={link.link}>
                                {link.name}
                            </NavLink>
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

export default AdminNavBar;
