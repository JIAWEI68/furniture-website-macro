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
  CheckboxGroup,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
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
  const [category, setCategory] = useState("Sofa");
  const [Material, setMaterial] = useState([]);
  const [Dimensions, setDimensions] = useState([]);
  const [Warranty, setWarranty] = useState([]);
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
  const [MaterialDetails, setMaterialDetails] = useState([]);
  const [DimensionsDetails, setDimensionsDetails] = useState([]);
  const [WarrantyDetails, setWarrantyDetails] = useState([]);
  const [featuresDetails, setFeaturesDetails] = useState("");
  const [checkMaterial, setCheckMaterial] = useState([]);
  const [MatNames, setMatNames] = useState([
    "Material",
    "Finish",
    "Hardware Feature",
    "Door Mechanism",
    "Care",
    "ColourVariance",
    "Leg Frame",
    "Saftey Tip",
    "Table Top",
    "Bed Slats",
    "Fabric Composition",
    "Filling",
    "Suspension",
    "Cover Type",
    "Special Feature",
    "Frame",
    "Base",
    "Disclaimer",
    "Cushion",
  ]);
  const [DimNames, setDimNames] = useState([
    "Dimension",
    "Seatable Width",
    "Seating Depth",
    "Seating Height",
    "BackRest Height",
    "Armrest Height",
    "Packaging Dimensions",
    "Leg Height",
    "Product Weight",
    "Max Bearing Support",
    "Leg Room - Height Clearance",
    "Leg to Leg Distance",
    "Capacity",
    "Levellers",
    "Slat to Slat Distance",
    "Recommended Mattress Thickness",
    "Frame Height",
    "Slat Height",
    "Mattress Space Dimension",
  ]);
  const [checkDim, setCheckDim] = useState([]);
  const [WarrName, setWarrName] = useState([
    "Cancellation",
    "Warranty",
    "Return Policy",
    "Assembly",
  ]);
  const [checkWarr, setCheckWarr] = useState([]);
  const [disMat, setDisMat] = useState([]);
  const [disDim, setDisDim] = useState([]);
  const [disWarr, setDisWarr] = useState([]);
  const AddFurniture = async () => {
    console.log(furniture.furnitureName);
    console.log(category);
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
        category: category,
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
  const handleMaterials = (e, index) => {
    const exist = Material.includes(e.target.value);
    //Update the object to true or false based off the value of the checkbox
    setCheckMaterial((current) => {
      // Set data as an object with the target value
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      //Return the data
      return data;
    });
    //Disable checkbox when clicked
    setDisMat((current) => {
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      return data;
    });
    console.log(exist);
    if (exist === true) {
      setMaterial((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
    if (exist === false) {
      setMaterial([...Material, e.target.value]);
    }
    console.log(checkMaterial);
    console.log(Material);
  };
  const handleDimensions = (e) => {
    const exist = Dimensions.includes(e.target.value);
    setCheckDim((current) => {
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      return data;
    });
    setDisDim((current) => {
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      return data;
    });
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
    const exist = Warranty.includes(e.target.value);
    setCheckWarr((current) => {
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      return data;
    });
    setDisWarr((current) => {
      const data = { ...current, [e.target.value]: !current[e.target.value] };
      return data;
    });
    if (exist === false) {
      setWarranty((current) => [...current, e.target.value]);
    }
    if (exist === true) {
      setWarranty((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };
  const handleMaterialDetails = (index, e, item) => {
    const values = [...MaterialDetails];
    values[index] = e.target.value;
    setMaterialDetails(values);
  };
  function handleDimensionsDetails(index, e) {
    const values = [...DimensionsDetails];
    values[index] = e.target.value;
    setDimensionsDetails(values);
  }

  function handleWarrantyDetails(index, e) {
    const values = [...WarrantyDetails];
    values[index] = e.target.value;
    setWarrantyDetails(values);
  }

  const deleteMaterial = (index, item) => {
    //Filter the item out from the array
    MaterialDetails.filter((item) => item !== MaterialDetails[index]);
    //Update the state of the checkbox to true or false based off the value of the checkbox
    setCheckMaterial((current) => {
      // Set data as an object with the target value
      const data = { ...current, [item]: false };
      //Return the data
      return data;
    });
    setDisMat((current) => {
      const data = { ...current, [item]: false };
      return data;
    });
    //Remove the item from the array
    MaterialDetails.splice(Material.indexOf(item), 1);
    Material.splice(Material.indexOf(item), 1);
    console.log(MaterialDetails);
    console.log(featuresDetails);
  };

  const deleteDimension = (index, item) => {
    //Filter the item out from the array
    DimensionsDetails.filter((item) => item !== DimensionsDetails[index]);
    //Update the state of the checkbox to true or false based off the value of the checkbox
    setCheckDim((current) => {
      // Set data as an object with the target value
      const data = { ...current, [item]: false };
      //Return the data
      return data;
    });
    setDisDim((current) => {
      const data = { ...current, [item]: false };
      return data;
    });
    //Remove the item from the array
    DimensionsDetails.splice(Dimensions.indexOf(item), 1);
    Dimensions.splice(Dimensions.indexOf(item), 1);
    console.log(DimensionsDetails);
  };

  const deleteWarranty = (index, item) => {
    //Filter the item out from the array
    WarrantyDetails.filter((item) => item !== WarrantyDetails[index]);
    //Update the state of the checkbox to true or false based off the value of the checkbox
    setCheckWarr((current) => {
      // Set data as an object with the target value
      const data = { ...current, [item]: false };
      //Return the data
      return data;
    });
    setDisWarr((current) => {
      const data = { ...current, [item]: false };
      return data;
    });
    //Remove the item from the array
    WarrantyDetails.splice(Warranty.indexOf(item), 1);
    Warranty.splice(Warranty.indexOf(item), 1);
    console.log(WarrantyDetails);
    console.log(featuresDetails);
  };

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
    console.log(checkMaterial);
  });

  return (
    <Box mt="20" mx="10" mb="-1">
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
              {MatNames.map((item, i) => (
                <Checkbox
                  value={item}
                  onChange={(e) => {
                    handleMaterials(e, i);
                  }}
                  key={i}
                  isChecked={checkMaterial[item]}
                  isDisabled={disMat[item]}
                >
                  {item}
                </Checkbox>
              ))}
            </Stack>
          </Box>
          <Box borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Product Dimensions</Heading>
            <Stack spacing={2} direction="column">
              {DimNames.map((item, i) => (
                <Checkbox
                  value={item}
                  onChange={handleDimensions}
                  key={i}
                  isChecked={checkDim[item]}
                  isDisabled={disDim[item]}
                >
                  {item}
                </Checkbox>
              ))}
            </Stack>
          </Box>
          <Box borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Delivery and Warranty</Heading>
            <Stack spacing={2} direction="column">
              {WarrName.map((item, i) => (
                <Checkbox
                  value={item}
                  onChange={handleWarranty}
                  key={i}
                  isChecked={checkWarr[item]}
                  isDisabled={disWarr[item]}
                >
                  {item}
                </Checkbox>
              ))}
            </Stack>
          </Box>
        </Stack>
      </FormControl>
      <Heading size="2xl">Features Details</Heading>
      <Stack direction="row" spacing={5}>
        <Box border={1} borderRadius={8} p={4}>
          <Heading size="xl">Product Material and Care</Heading>
          {Material.map((item, i) => (
            <Container key={i} maxW="container.sm">
              <Stack direction="row" spacing={40}>
                <Text mb="8px">{item}</Text>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    deleteMaterial(i, item);
                  }}
                />
              </Stack>
              <Input
                value={MaterialDetails[i]}
                onChangeCapture={(e) => {
                  handleMaterialDetails(i, e, item);
                }}
                size="md"
              />
            </Container>
          ))}
        </Box>
        <Box border={1} borderRadius={8} p={4}>
          <Heading size="xl">Product Dimensions</Heading>
          {Dimensions.map((item, i) => (
            <Container key={i} maxW="2xl">
              <Stack direction="row" spacing={40}>
                <Text mb="8px">{item}</Text>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    deleteDimension(i, item);
                  }}
                />
              </Stack>
              <Input
                value={DimensionsDetails[i]}
                onChange={(e) => {
                  handleDimensionsDetails(i, e);
                }}
                size="md"
              />
            </Container>
          ))}
        </Box>
        <Box border={1} borderRadius={8} p={4}>
          <Heading size="xl">Delivery and Warranty</Heading>
          {Warranty.map((item, i) => (
            <Stack key={i} direction="row" spacing={20}>
              <Container maxW="2xl">
                <Stack direction="row" spacing={40}>
                  <Text mb="8px">{item}</Text>
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={(e) => {
                      deleteWarranty(i, item);
                    }}
                  />
                </Stack>
                <Input
                  value={WarrantyDetails[i]}
                  onChange={(e) => {
                    handleWarrantyDetails(i, e);
                  }}
                  size="md"
                />
              </Container>
            </Stack>
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
  );
};

export default AddFurniture;
