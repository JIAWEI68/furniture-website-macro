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
} from "@chakra-ui/react";

import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const Furniture = () => {
  const location = useLocation();
  const [furniture, setFurniture] = useState(location.state);
  const [isExpandedMat, setIsExpandedMat] = useState(false);
  const [isExpandedDim, setIsExpandedDim] = useState(false);
  const [isExpandedDel, setIsExpandedDel] = useState(false);
  const [Material, setMaterial] = useState(
    //Remove the first and last character of the string
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
    <Grid mt="20" mx="10" mb="-1" width="100%" templateAreas={`"image text"`}>
      <GridItem area="image">
        <Image src={furniture.image} />
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
            <AccordionPanel flex="1" width={100}>
              <Stack direction={"row"} spacing = {400}>
                <Stack direction={"column"}>
                  {Material.map((material) => (
                    <Center key={material}>
                      <Text>{material}</Text>
                    </Center>
                  ))}
                </Stack>
                <Stack direction={"column"} justifyContent={"right"}>
                  {MatDetails.map((matDetails) => (
                    <Center key={matDetails}>
                      <Text>{matDetails}</Text>
                    </Center>
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
            <AccordionPanel width = {100}>
              <Stack direction={"row"} spacing = {400}>
                <Stack direction={"column"}>
                  {Dimensions.map((dimension) => (
                    <Center key={dimension} flex="1">
                      <Text>{dimension}</Text>
                    </Center>
                  ))}
                </Stack>
                <Stack direction={"column"} justifyContent={"right"}>
                  {DimDetails.map((dimDetails) => (
                    <Center key={dimDetails}>
                      <Text>{dimDetails}</Text>
                    </Center>
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
            <AccordionPanel width = {100}>
              <Stack direction={"row"} spacing = {400}>
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
  );
};
export default Furniture;
