import { useState, useEffect } from "react";
import { rootUri } from "/apis/api.js";
import {
  Container,
  SimpleGrid,
  Center,
  Text,
  Image,
  Box,
  Stack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UpdateFurniture = () => {
  const [furniture, setFurniture] = useState([]);
  const [discCost, setDisCost] = useState();
  const navigate = useNavigate();
  const fetchAllFurniture = async () => {
    try {
      const result = await fetch(`${rootUri}/furniture`);
      const data = await result.json();
      setFurniture(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCost = async (id) => {
    const percent = (100 - discCost) / 100;
    try {
      const result = await fetch(`${rootUri}/furniture/updateCost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Required for CORS support to work
          "Allow-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({ percent: percent }),
      });
      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    navigate("/")
  };
  

  useEffect(() => {
    fetchAllFurniture();
    console.log(furniture);
  }, []);

  return (
    <Center>
      <Container mt="20" mx="10" mb="-1" width="100%">
        <SimpleGrid column={3} spacing={2}>
          {furniture.map((furniture) => {
            if (furniture.discCost !== 0) {
              return;
            } else if (furniture.discCost === 0) {
              return (
                <Box key={furniture.id} justifyContent={"center"}>
                  <Image src={furniture.image} w={156.5} h={100} />
                  <Container width={156.5} padding={0} margin={0}>
                    <Text>{furniture.furnitureName}</Text>
                    <Text>${furniture.ogCost}</Text>
                    <Text>Discount Percentage</Text>
                    <InputGroup>
                      <InputRightElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                      >
                        %
                      </InputRightElement>
                      <Input
                        type="number"
                        placeholder="Percentage"
                        onChange={(e) => {
                          setDisCost(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <Button marginTop={2} onClick={(e) => updateCost(furniture.id)}>Update</Button>
                  </Container>
                </Box>
              );
            }
          })}
        </SimpleGrid>
      </Container>
    </Center>
  );
};

export default UpdateFurniture;
