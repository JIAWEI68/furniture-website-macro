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
    Button
  } from '@chakra-ui/react'
import { rootUri } from "/apis/api.js";

const AddFurnitureForm = () => {
    const [furniture, setFurniture] = useState({
        furnitureName: "",
        furnitureDescription: "",
        ogCost: "",
        discCost: "",
        model: "",
        image: "",
        video: "",
        material: "",
        category: ""
    });
    const [features, setFeatures] = useState({
        featuresCategory: "",
        features: "",
        featuresDetails: ""
    });
    const [furnitureList, setFurnitureList] = useState([]);
    const [category, setCategory] = useState("Sofa");
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
    }
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
    }
    return (
        <Box>
            <FormControl id="furnitureName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, furnitureName: e.target.value})}/>
            </FormControl>
            <FormControl id="furnitureDescription" isRequired>
                <FormLabel>Description</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, furnitureDescription: e.target.value})}/>
            </FormControl>
            <FormControl id="ogCost" isRequired>
                <FormLabel>Original Cost</FormLabel>
                <Input type="number" onChange={(e) => setFurniture({...furniture, ogCost: e.target.value})}/>
            </FormControl>
            <FormControl id="discCost">
                <FormLabel>Discounted Cost</FormLabel>
                <Input type="number" onChange={(e) => setFurniture({...furniture, discCost: e.target.value})}/>
            </FormControl>
            <FormControl id="model" isRequired>
                <FormLabel>Model</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, model: e.target.value})}/>
            </FormControl>
            <FormControl id="image" isRequired>
                <FormLabel>Image</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, image: e.target.value})}/>
            </FormControl>
            <FormControl id="video">
                <FormLabel>Video</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, video: e.target.value})}/>
            </FormControl>
            <FormControl id="material" isRequired>
                <FormLabel>Material</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, material: e.target.value})}/>
            </FormControl>
            <FormControl id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <Input type="text" onChange={(e) => setFurniture({...furniture, category: e.target.value})}/>
            </FormControl>
            <FormControl id="featuresCategory" isRequired>
                <FormLabel>Features Category</FormLabel>
                <Input type="text" onChange = {(e) => setFeatures({...features, featuresCategory: e.target.value})}/>
            </FormControl>
            <FormControl id="features" isRequired>
                <FormLabel>Features</FormLabel>
                <Input type="text" onChange = {(e) => setFeatures({...features, features: e.target.value})}/>
            </FormControl>
            <FormControl id="featuresDetails" isRequired>
                <FormLabel>Features Details</FormLabel>
                <Input type="text" onChange = {(e) => setFeatures({...features, featuresDetails: e.target.value})}/>
            </FormControl>
            <Button onClick={AddFurniture}>Add Furniture</Button>
        </Box>
    )

}

export default AddFurnitureForm;