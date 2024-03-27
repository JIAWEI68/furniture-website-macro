import {
  Box,
  HStack,
  useColorModeValue,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import LoginAndRegisterModal from "./LoginAndRegisterModal";


const NavBar = () => {
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

  const [modelLinks, setModelLinks] = useState([
    { name: "Sofa", link: "/Sofa" },
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
