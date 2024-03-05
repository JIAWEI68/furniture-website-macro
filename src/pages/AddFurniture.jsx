import React from "react";
import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Box,
  Input,
  Button,
  Stack,
  Checkbox,
  Radio,
  RadioGroup,
  Container,
  Heading,
} from "@chakra-ui/react";
import { rootUri } from "/apis/api.js";

const AddFurniture = () => {
  const [furniture, setFurniture] = useState({
    furnitureName: "",
    furnitureDescription: "",
    ogCost: "",
    discCost: "",
    model: "",
    image: "",
    video: "",
    material: "",
    category: "",
  });
  const [furnitureList, setFurnitureList] = useState([]);
  const [State, setState] = useState(false);
  const [category, setCategory] = useState("Sofa");
  const [Material, setMaterial] = useState([]);
  const [Dimensions, setDimensions] = useState([]);
  const [Warranty, setWarranty] = useState([]);
  const [features, setFeatures] = useState(
    "Material" + ";" + "Dimensions" + ";" + "Warranty"
  );
  const [featuresList, setFeaturesList] = useState(
    "[" +
      Material.toString() +
      "]" +
      ";" +
      "[" +
      Dimensions.toString() +
      "]" +
      ";" +
      "[" +
      Warranty.toString() +
      "]"
  );
  const [MaterialDetails, setMaterialDetails] = useState([
  ]);
  const [DimensionsDetails, setDimensionsDetails] = useState([]);
  const [WarrantyDetails, setWarrantyDetails] = useState([]);
  const [featuresDetails, setFeaturesDetails] = useState("");
  useEffect(() => {
    setFeaturesList(
      "[" +
        Material.toString() +
        "]" +
        ";" +
        "[" +
        Dimensions.toString() +
        "]" +
        ";" +
        "[" +
        Warranty.toString() +
        "]"
    );
    setFeaturesDetails(
      "[" +
        MaterialDetails.toString() +
        "]" +
        ";" +
        "[" +
        DimensionsDetails.toString() +
        "]" +
        ";" +
        "[" +
        WarrantyDetails.toString() +
        "]"
    );
    console.log(featuresList);
    console.log(featuresDetails);
  }, [
    Material,
    Dimensions,
    Warranty,
    MaterialDetails,
    DimensionsDetails,
    WarrantyDetails,
  ]);

  const AddFurniture = async () => {
    console.log(furniture.furnitureName);
    console.log(category)
    const response = await fetch(`${rootUri}/furniture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Required for CORS support to work
        "Allow-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify({
        furnitureName: furniture.furnitureName,
        furnitureDescription: furniture.furnitureDescription,
        ogCost: furniture.ogCost,
        discCost: furniture.discCost,
        model: furniture.model,
        image: furniture.image,
        video: furniture.video,
        material: furniture.material,
        category: category
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  const AddFeatures = async () => {
    const response = await fetch(`${rootUri}/furniture/features`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Required for CORS support to work
        "Allow-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify({
        featuresCategory:
          "Product Material and Care; Product Dimensions; Delivery and Warranty",
        features: featuresList,
        featuresDetails: featuresDetails,
      }),
    });
    const data = await response.json();
    console.log(data);
    setMaterialDetails([]);
    setDimensionsDetails([]);
    setWarrantyDetails([]);
  };
  const handleMaterials = (e) => {
    console.log(Material);
    const exist = Material.includes(e.target.value);
    console.log(exist);
    if (exist === false) {
      setMaterial((current) => [...current, e.target.value]);
    }
    if (exist === true) {
      setMaterial((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };
  const handleDimensions = (e) => {
    const exist = Dimensions.includes(e.target.value);
    if (exist === false) {
      setDimensions((current) => [...current, e.target.value]);
    }
    if (exist === true) {
      setDimensions((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };
  const handleWarranty = (e) => {
    console.log(Warranty )
    const exist = Warranty.includes(e.target.value);
    if (exist === false) {
      setWarranty((current) => [...current, e.target.value]);
    }
    if (exist === true) {
      setWarranty((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  }
  const handleMaterialDetails = (e) => {
    // MaterialDetails(Material.length).push(e.target.value); 
    setMaterialDetails((current)=> [...current, e.target.value]);
  };
  const handleDimensionsDetails = (e) => {
    setDimensionsDetails((current)=> [...current, e.target.value]);
  };
  const handleWarrantyDetails = (e) => {
    setWarrantyDetails((current)=> [...current, e.target.value]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box>
        <FormControl id="furnitureName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({ ...furniture, furnitureName: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="furnitureDescription" isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({
                ...furniture,
                furnitureDescription: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl id="ogCost" isRequired>
          <FormLabel>Original Cost</FormLabel>
          <Input
            type="number"
            onChange={(e) =>
              setFurniture({ ...furniture, ogCost: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="discCost">
          <FormLabel>Discounted Cost</FormLabel>
          <Input
            type="number"
            onChange={(e) =>
              setFurniture({ ...furniture, discCost: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="model" isRequired>
          <FormLabel>Model</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({ ...furniture, model: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Image</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({ ...furniture, image: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="video">
          <FormLabel>Video</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({ ...furniture, video: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="material" isRequired>
          <FormLabel>Material</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFurniture({ ...furniture, material: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <RadioGroup onChange={setCategory} value={category}>
            <Stack direction="row">
              <Radio value="Sofa">Sofa</Radio>
              <Radio value="Bed">Bed</Radio>
              <Radio value="Table">Table</Radio>
              <Radio value="Chair">Chair</Radio>
              <Radio value="Storage">Storage</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="features" isRequired>
          <FormLabel>Features</FormLabel>
          <Stack direction="row" spacing={5}>
            <Box borderWidth="1px" borderRadius="lg">
              <Heading size="xl">Product Material and Care</Heading>
              <Stack spacing={2} direction="column">
                <Checkbox value="Material" onChange={handleMaterials}>
                  Material
                </Checkbox>
                <Checkbox value="Finish" onChange={handleMaterials}>
                  Finish
                </Checkbox>
                <Checkbox value="Hardware Feature" onChange={handleMaterials}>
                  Hardware Feature
                </Checkbox>
                <Checkbox value="Door Mechanism" onChange={handleMaterials}>
                  Door Mechanism
                </Checkbox>
                <Checkbox value="Care" onChange={handleMaterials}>
                  Care
                </Checkbox>
                <Checkbox value="Colour Variance" onChange={handleMaterials}>
                  Colour Variance
                </Checkbox>
                <Checkbox value="Leg Frame" onChange={handleMaterials}>
                  Leg Frame
                </Checkbox>
                <Checkbox value="Saftey Tip" onChange={handleMaterials}>
                  Saftey Tip
                </Checkbox>
                <Checkbox value="Table Top" onChange={handleMaterials}>
                  Table Top
                </Checkbox>
                <Checkbox value="Bed Slats" onChange={handleMaterials}>
                  Bed Slats
                </Checkbox>
                <Checkbox value="Fabric Composition" onChange={handleMaterials}>
                  Fabric Composition
                </Checkbox>
                <Checkbox value="Filling" onChange={handleMaterials}>
                  Filling
                </Checkbox>
                <Checkbox value="Suspension" onChange={handleMaterials}>
                  Suspension
                </Checkbox>
                <Checkbox value="Cover Type" onChange={handleMaterials}>
                  Cover Type
                </Checkbox>
                <Checkbox value="Special Feature" onChange={handleMaterials}>
                  Special Feature
                </Checkbox>
                <Checkbox value="Frame" onChange={handleMaterials}>
                  Frame
                </Checkbox>
                <Checkbox value="Base" onChange={handleMaterials}>
                  Base
                </Checkbox>
                <Checkbox value="Disclaimer" onChange={handleMaterials}>
                  Disclaimer
                </Checkbox>
                <Checkbox value="Cushion" onChange={handleMaterials}>
                  Cushion
                </Checkbox>
              </Stack>
            </Box>
            <Box borderWidth="1px" borderRadius="lg">
              <Heading size="xl">Product Dimensions</Heading>
              <Stack spacing={2} direction="column">
                <Checkbox value="Dimension" onChange={handleDimensions}>
                  Dimension
                </Checkbox>
                <Checkbox value="Seatable Width" onChange={handleDimensions}>
                  Seatable Width
                </Checkbox>
                <Checkbox value="Seating Depth" onChange={handleDimensions}>
                  Seating Depth
                </Checkbox>
                <Checkbox value="Seating Height" onChange={handleDimensions}>
                  Seating Height
                </Checkbox>
                <Checkbox value="BackRest Height" onChange={handleDimensions}>
                  BackRest Height
                </Checkbox>
                <Checkbox value="Armrest Height" onChange={handleDimensions}>
                  Armrest Height
                </Checkbox>
                <Checkbox
                  value="Packaging Dimensions"
                  onChange={handleDimensions}
                >
                  Packaging Dimensions
                </Checkbox>
                <Checkbox value="Leg Height" onChange={handleDimensions}>
                  Leg Height
                </Checkbox>
                <Checkbox value="Product Weight" onChange={handleDimensions}>
                  Product Weight
                </Checkbox>
                <Checkbox
                  value="Max Bearing Support"
                  onChange={handleDimensions}
                >
                  Max Bearing Support
                </Checkbox>
                <Checkbox
                  value="Leg Room - Height Clearance"
                  onChange={handleDimensions}
                >
                  Leg Room - Height Clearance
                </Checkbox>
                <Checkbox
                  value="Leg to Leg Distance"
                  onChange={handleDimensions}
                >
                  Leg to Leg Distance
                </Checkbox>
                <Checkbox value="Capacity" onChange={handleDimensions}>
                  Capacity
                </Checkbox>
                <Checkbox value="Levellers" onChange={handleDimensions}>
                  Levellers
                </Checkbox>
                <Checkbox
                  value="Slat to Slat Distance"
                  onChange={handleDimensions}
                >
                  Slat to Slat Distance
                </Checkbox>
                <Checkbox
                  value="Recommended Mattress Thickness"
                  onChange={handleDimensions}
                >
                  Recommended Matress Thickness
                </Checkbox>
                <Checkbox value="Frame Height" onChange={handleDimensions}>
                  Frame Height
                </Checkbox>
                <Checkbox value="Slat Height" onChange={handleDimensions}>
                  Slat Height
                </Checkbox>
                <Checkbox
                  value="Mattress Space Dimension"
                  onChange={handleDimensions}
                >
                  Matress Space Dimension
                </Checkbox>
                <Checkbox
                  value="Mattress Space Dimension"
                  onChange={handleDimensions}
                >
                  Matress Space Dimension
                </Checkbox>
              </Stack>
            </Box>
            <Box borderWidth="1px" borderRadius="lg">
              <Heading size="xl">Delivery and Warranty</Heading>
              <Stack spacing={2} direction="column">
                <Checkbox value="Cancellation" onChange={handleWarranty}>
                  Cancellation
                </Checkbox>
                <Checkbox value="Warranty" onChange={handleWarranty}>
                  Warranty
                </Checkbox>
                <Checkbox value="Return Policy" onChange={handleWarranty}>
                  Return Policy
                </Checkbox>
                <Checkbox value="Assembly" onChange={handleWarranty}>
                  Assembly
                </Checkbox>
              </Stack>
            </Box>
          </Stack>
        </FormControl>
        <Heading size="2xl">Features Details</Heading>
        <Stack direction="row" spacing={5}>
          <Box border={1} borderRadius={8} p={4}>
            <Heading size="xl">Product Material and Care</Heading>
            {Material.map((item) => (
              <Container key={item} maxW="container.sm">
                <Text mb="8px">{item}</Text>
                <Input
                  onChangeCapture={handleMaterialDetails}
                  size="md"
                />
              </Container>
            ))}
          </Box>
          <Box border={1} borderRadius={8} p={4}>
            <Heading size="xl">Product Dimensions</Heading>
            {Dimensions.map((item) => (
              <Container key={item} maxW="2xl">
                <Text mb="8px">{item}</Text>
                <Input
                  onChange={handleDimensionsDetails}
                  size="md"
                />
              </Container>
            ))}
          </Box>
          <Box border={1} borderRadius={8} p={4}>
            <Heading size="xl">Delivery and Warranty</Heading>
            {Warranty.map((item) => (
              <Container key={item.name} maxW="2xl">
                <Text mb="8px">{item}</Text>
                <Input
                  onChange={handleWarrantyDetails}
                  size="md"
                />
              </Container>
            ))}
          </Box>
        </Stack>
        <Button
          onClick={() => {
            AddFurniture();
            AddFeatures();
          }}
        >
          Add Furniture
        </Button>
      </Box>
    </div>
  );
};

export default AddFurniture;
