import { Box, HStack, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [Links, setLinks] = useState([
    { name: "Add Furniture", link: "/addfurniture" },
    { name: "Update Furniture", link: "/updatefurniture"}
  ]);
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
              <NavLink key={link} to={link.link}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
