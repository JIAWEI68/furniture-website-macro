import { Box, HStack, useColorModeValue, Flex, Spacer, useDisclosure, Modal, IconButton } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import LoginAndRegisterModal from "./LoginAndRegisterModal";


const NavBar = () => {
  const [Links, setLinks] = useState([
    { name: "Sofa", link: "/Sofa" },
    { name: "Bed", link: "/Bed" },
    { name: "Table", link: "/Table" },
    { name: "Chair", link: "/Chair" }
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <NavLink key={link.name} to={link.link} state={link.name}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton icon={<CiUser />} borderRadius={0} background={"none"} onClick={onOpen} _hover={"none"}
            _active={{
              background: "none"
            }} />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <LoginAndRegisterModal />
      </Modal>
    </Box>
  );
};

export default NavBar;
