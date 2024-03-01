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
  const [features, setFeatures] = useState({
    featuresCategory: "",
    features: "",
    featuresDetails: "",
  });
  const [furnitureList, setFurnitureList] = useState([]);
  const [category, setCategory] = useState("Sofa");
  const [Material, setMaterial] = useState([]);
  const AddFurniture = async () => {
    const response = await fetch(`${rootUri}/addfurniture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(furniture),
    });
    const data = await response.json();
    console.log(data);
  };
  const AddFeatures = async () => {
    const response = await fetch(`${rootUri}/addfurniturefeatures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(features),
    });
    const data = await response.json();
    console.log(data);
  };
  const handleFeatures = (e) => {
    setMaterial(current => [...current, e.target.value]);
  };
  return (
    <div text-align = "center">
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
        <FormControl id="featuresCategory" isRequired>
          <FormLabel>Features Category</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFeatures({ ...features, featuresCategory: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="features" isRequired>
          <FormLabel>Features</FormLabel>
          <Stack direction = "row" spacing = {5}>
            <Box borderWidth='1px' borderRadius='lg'>
                <Title>Product Material and Care</Title>
                <Stack spacing = {2} direction='column'>
                    <Checkbox value='Material' onChange={handleFeatures}>Material</Checkbox>
                    <Checkbox value='Finish' onChange={handleFeatures}>Finish</Checkbox>
                    <Checkbox value='Hardware Feature' onChange={handleFeatures}>Hardware Feature</Checkbox>
                    <Checkbox value='Door Mechanism' onChange={handleFeatures}>Door Mechanism</Checkbox>
                    <Checkbox value='Care' onChange={handleFeatures}>Care</Checkbox>
                    <Checkbox value='Colour Variance' onChange={handleFeatures}>Colour Variance</Checkbox>
                    <Checkbox value='Leg Frame' onChange={handleFeatures}>Leg Frame</Checkbox>
                    <Checkbox value='Saftey Tip' onChange={handleFeatures}>Saftey Tip</Checkbox>
                    <Checkbox value='Table Top' onChange={handleFeatures}>Table Top</Checkbox>
                    <Checkbox value='Bed Slats' onChange={handleFeatures}>Bed Slats</Checkbox>
                    <Checkbox value='Fabric Composition' onChange={handleFeatures}>Fabric Composition</Checkbox>
                    <Checkbox value='Filling' onChange={handleFeatures}>Filling</Checkbox>
                    <Checkbox value='Suspension' onChange={handleFeatures}>Suspension</Checkbox>
                    <Checkbox value='Cover Type' onChange={handleFeatures}>Cover Type</Checkbox>
                    <Checkbox value='Special Feature' onChange={handleFeatures}>Special Feature</Checkbox>
                    <Checkbox value='Frame' onChange={handleFeatures}>Frame</Checkbox>
                    <Checkbox value='Base' onChange={handleFeatures}>Base</Checkbox>
                    <Checkbox value='Disclaimer' onChange={handleFeatures}>Disclaimer</Checkbox>
                    <Checkbox value='Cushion' onChange={handleFeatures}>Cushion</Checkbox>
                </Stack>
            </Box>
            <Box borderWidth='1px' borderRadius='lg'>
                <Title>Product Material and Care</Title>
                <Stack spacing = {2} direction='column'>
                    <Checkbox value='Material' onChange={handleFeatures}>Material</Checkbox>
                    <Checkbox value='Finish' onChange={handleFeatures}>Finish</Checkbox>
                    <Checkbox value='Hardware Feature' onChange={handleFeatures}>Hardware Feature</Checkbox>
                    <Checkbox value='Door Mechanism' onChange={handleFeatures}>Door Mechanism</Checkbox>
                    <Checkbox value='Care' onChange={handleFeatures}>Care</Checkbox>
                    <Checkbox value='Colour Variance' onChange={handleFeatures}>Colour Variance</Checkbox>
                    <Checkbox value='Leg Frame' onChange={handleFeatures}>Leg Frame</Checkbox>
                    <Checkbox value='Saftey Tip' onChange={handleFeatures}>Saftey Tip</Checkbox>
                    <Checkbox value='Table Top' onChange={handleFeatures}>Table Top</Checkbox>
                    <Checkbox value='Bed Slats' onChange={handleFeatures}>Bed Slats</Checkbox>
                    <Checkbox value='Fabric Composition' onChange={handleFeatures}>Fabric Composition</Checkbox>
                    <Checkbox value='Filling' onChange={handleFeatures}>Filling</Checkbox>
                    <Checkbox value='Suspension' onChange={handleFeatures}>Suspension</Checkbox>
                    <Checkbox value='Cover Type' onChange={handleFeatures}>Cover Type</Checkbox>
                    <Checkbox value='Special Feature' onChange={handleFeatures}>Special Feature</Checkbox>
                    <Checkbox value='Frame' onChange={handleFeatures}>Frame</Checkbox>
                    <Checkbox value='Base' onChange={handleFeatures}>Base</Checkbox>
                    <Checkbox value='Disclaimer' onChange={handleFeatures}>Disclaimer</Checkbox>
                    <Checkbox value='Cushion' onChange={handleFeatures}>Cushion</Checkbox>
                </Stack>
            </Box>
          </Stack>
        </FormControl>
        <FormControl id="featuresDetails" isRequired>
          <FormLabel>Features Details</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setFeatures({ ...features, featuresDetails: e.target.value })
            }
          />
        </FormControl>
        <Button onClick={AddFurniture}>Add Furniture</Button>
      </Box>
    </div>
  );
};

export default AddFurniture;
