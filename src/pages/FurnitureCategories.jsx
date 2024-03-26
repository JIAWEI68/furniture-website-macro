import {
    Center,
    Container,
    SimpleGrid,
    Image,
    Box,
    Text,
    Stack,
    AspectRatio,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { rootUri } from "/apis/api.js";
  import { Link, useLocation, } from "react-router-dom";
  
  const FurnitureCategories = () => {
    const [furniture, setFurniture] = useState([]);
    const location = useLocation();
    const [categories, setCategories] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchFurniture = async (category) => {
      try {
        const result = await fetch(`${rootUri}/furniture/${category}`);
        const data = await result.json();
        setFurniture(data);
        setLoading(true)
      } catch (err) {
        console.error(err);
      }
    };
  
    //Update the data when the category changes
    useEffect(() => {
      const categories = location.state;
      fetchFurniture(categories);
      console.log(furniture);
      console.log(categories);
    }, [location]);

    return (
      <Center>
        <Container mt="20" mx="10" mb="-1" width="100%">
          <SimpleGrid columns={3} spacing={2}>
            {furniture.map((furniture) => {
              if (furniture.discCost !== 0) {
                return (
                  <Box key={furniture.id}>
                    <Link to={"/furniture"} state={furniture}>
                      <Image src={furniture.image} w={200} h={100} />
                    </Link>
                    <Link to={"/furniture"} state={furniture}>
                      {furniture.furnitureName}
                    </Link>
                    <Stack direction="row" justifyContent={"center"}>
                      <Text>${furniture.discCost}</Text>
                      <Center>
                        <Text as="s">${furniture.ogCost}</Text>
                      </Center>
                    </Stack>
                  </Box>
                );
              } else if (furniture.discCost === 0) {
                return (
                  <Box key={furniture.id}>
                    <Link to={"/furniture"} state={furniture}>
                      <Image src={furniture.image} w={200} h={100} />
                    </Link>
                    <Link to={"/furniture"} state={furniture}>
                      {furniture.furnitureName}
                    </Link>
                    <Center>
                      <Text>${furniture.ogCost}</Text>
                    </Center>
                  </Box>
                );
              }
            })}
          </SimpleGrid>
        </Container>
      </Center>
    );
  };
  
  export default FurnitureCategories;
  