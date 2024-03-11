import { useState, useEffect } from "react";
import { rootUri } from "../../apis/api";
import { useLocation, useSearchParams } from "react-router-dom";
import { Grid, GridItem, Image, Text, Center } from "@chakra-ui/react";

const Furniture = () => {
  const location = useLocation();
  const [furniture, setFurniture] = useState(location.state);
  useEffect(() => {
    console.log(furniture.furnitureName);
  }, []);
  return (
    <Grid mt="20" mx="10" mb="-1" width="100%" templateAreas={"image text"}>
        <GridItem area = "image">
            <Image src={furniture.image}/>
        </GridItem>
        <GridItem area="text">
            <Text>
                {furniture.furnitureName}
            </Text>
        </GridItem>
    </Grid>
  );
};
export default Furniture;
