import {
  Center,
  Container,
  SimpleGrid,
  Image,
  Box,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { rootUri } from "/apis/api.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [furniture, setFurniture] = useState([]);
  const fetchFurniture = async () => {
    try {
      const result = await fetch(`${rootUri}/furniture`);
      const data = await result.json();
      setFurniture(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFurniture();
    console.log(furniture);
  }, []);

  return (
    <Center>
      <Container mt="20" mx="10" mb="-1" width="100%">
        <SimpleGrid columns={3}>
          {furniture.map((furniture) => {
            if (furniture.discCost !== 0) {
              return (
                <Box key={furniture.id}>
                  <Link to={"/furniture"} state={furniture}>
                    <Image src={furniture.image} />
                  </Link>
                  <Link to={"/furniture"} state={furniture}>
                    {furniture.furnitureName}
                  </Link>
                  <Stack direction="row">
                    <Text>${furniture.discCost}</Text>
                    <Text as="s">${furniture.ogCost}</Text>
                  </Stack>
                </Box>
              );
            } else if (furniture.discCost === 0) {
              return (
                <Box key={furniture.id}>
                  <Link to={"/furniture"} state={furniture}>
                    <Image src={furniture.image} />
                  </Link>
                  <Link to={"/furniture"} state={furniture}>
                    {furniture.furnitureName}
                  </Link>
                  <Text>${furniture.ogCost}</Text>
                </Box>
              );
            }
          })}
        </SimpleGrid>
      </Container>
    </Center>
  );
};

export default Home;
