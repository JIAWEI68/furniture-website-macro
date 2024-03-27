import { useState, useEffect } from "react";
import { rootUri } from "../../apis/api";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Container,
} from "@chakra-ui/react";

import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const Furniture = () => {
  const location = useLocation();
  const [furniture, setFurniture] = useState(location.state);
  const [isExpandedMat, setIsExpandedMat] = useState(false);
  const [isExpandedDim, setIsExpandedDim] = useState(false);
  const [isExpandedDel, setIsExpandedDel] = useState(false);
  const [Material, setMaterial] = useState(
    //Remove the first and last character of the string and split it by the comma
    furniture.features.split(";")[0].slice(1, -1).split(",")
  );
  const [MatDetails, setMatDetails] = useState(
    furniture.featuresDetails.split(";")[0].slice(1, -1).split(",")
  );
  const [Dimensions, setDimensions] = useState(
    furniture.features.split(";")[1].slice(1, -1).split(",")
  );
  const [DimDetails, setDimDetails] = useState(
    furniture.featuresDetails.split(";")[1].slice(1, -1).split(",")
  );
  const [Delivery, setDelivery] = useState(
    furniture.features.split(";")[2].slice(1, -1).split(",")
  );
  const [DelDetails, setDelDetails] = useState(
    furniture.featuresDetails.split(";")[2].slice(1, -1).split(",")
  );
  const handleExpandMat = () => {
    setIsExpandedMat(!isExpandedMat);
  };
  const handleExpandDim = () => {
    setIsExpandedDim(!isExpandedDim);
  };
  const handleExpandDel = () => {
    setIsExpandedDel(!isExpandedDel);
  };

  useEffect(() => {
    console.log(furniture);
    console.log(Material);
    console.log(MatDetails);
  }, [furniture]);

  return (
    <Center>
      <Grid
        mt="20"
        mx="10"
        mb="-1"
        width="100%"
        templateAreas={`"image text"`}
        gap="4"
        gridTemplateRows={"30px 20px"}
        gridTemplateColumns={"300px 1fr"}
      >
        <GridItem area="image">
          <Image src={furniture.image} width={380} />
        </GridItem>
        <GridItem area="text">
          <Text>{furniture.furnitureName}</Text>
          {furniture.discCost !== 0 ? (
            // Push the stack to the right
            <Stack direction="row" display={"flex"} justifyContent={"center"}>
              <Text>${furniture.discCost}</Text>
              <Text as="s">${furniture.ogCost}</Text>
            </Stack>
          ) : (
            <Text>${furniture.ogCost}</Text>
          )}
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton onClick={handleExpandMat}>
                <Box as="span" flex="1" textAlign="left">
                  Product Material & Care
                </Box>
                {isExpandedMat ? <MinusIcon /> : <AddIcon />}
              </AccordionButton>
              <AccordionPanel width={100}>
                <Stack direction={"row"} spacing={325}>
                  <Stack direction={"column"} spacing={1}>
                    {Material.map((material) => (
                      <Container maxW="md" key={material}>
                        <Center>
                          <Text>{material}</Text>
                        </Center>
                      </Container>
                    ))}
                  </Stack>
                  <Stack
                    direction={"column"}
                    margin={"auto"}
                    marginRight={10}
                    marginLeft={10}
                    width={90}
                    marginTop={0}
                    spacing={5}
                  >
                    {MatDetails.map((matDetails) => (
                      <Container key={matDetails} maxW="100px">
                        <Center>
                          <Text>{matDetails}</Text>
                        </Center>
                      </Container>
                    ))}
                  </Stack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton onClick={handleExpandDim}>
                <Box as="span" flex="1" textAlign="left">
                  Product Dimensions
                </Box>
                {isExpandedDim ? <MinusIcon /> : <AddIcon />}
              </AccordionButton>
              <AccordionPanel width={100}>
                <Stack direction={"row"} spacing={325}>
                  <Stack direction={"column"}>
                    {Dimensions.map((dimension) => (
                      <Container key={dimension} maxW="md">
                        <Center>
                          <Text>{dimension}</Text>
                        </Center>
                      </Container>
                    ))}
                  </Stack>
                  <Stack
                    direction={"column"}
                    margin={"auto"}
                    marginRight={10}
                    marginLeft={10}
                    marginTop={0}
                    spacing={5}
                  >
                    {DimDetails.map((dimDetails) => (
                      <Container key={dimDetails} maxW="md">
                        <Center>
                          <Text>{dimDetails}</Text>
                        </Center>
                      </Container>
                    ))}
                  </Stack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton onClick={handleExpandDel}>
                <Box as="span" flex="1" textAlign="left">
                  Delivery & Warranty
                </Box>
                {isExpandedDel ? <MinusIcon /> : <AddIcon />}
              </AccordionButton>
              <AccordionPanel width={100}>
                <Stack direction={"row"} spacing={400}>
                  <Stack direction={"column"}>
                    {Delivery.map((delivery) => (
                      <Center key={delivery}>
                        <Text>{delivery}</Text>
                      </Center>
                    ))}
                  </Stack>
                  <Stack direction={"column"} justifyContent={"right"}>
                    {DelDetails.map((delDetails) => (
                      <Center key={delDetails}>
                        <Text>{delDetails}</Text>
                      </Center>
                    ))}
                  </Stack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </Center>
  );
};
export default Furniture;
