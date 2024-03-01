"use strict";

class Furniture {
  constructor(
    id,
    furnitureName,
    furnitureDescription,
    ogCost,
    discCost,
    model,
    image,
    video,
    material,
    createdDate,
    featuresCategory,
    features,
    featuresDetails,
    category
  ) {
    this.id = id;
    this.furnitureName = furnitureName;
    this.furnitureDescription = furnitureDescription;
    this.ogCost = ogCost;
    this.discCost = discCost;
    this.model = model;
    this.image = image;
    this.video = video;
    this.material = material;
    this.createdDate = createdDate;
    this.featuresCategory = featuresCategory;
    this.features = features;
    this.featuresDetails = featuresDetails;
    this.category = category;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.furnitureName;
  }
  getDesc() {
    return this.furnitureDescription;
  }
  getOgCost() {
    return this.ogCost;
  }
  getDiscCost() {
    return this.discCost;
  }
  getModel() {
    return this.model;
  }
  getImage() {
    return this.image;
  }
  getVideo() {
    return this.video;
  }
  getMaterial() {
    return this.material;
  }
  getCreatedDate() {
    return this.createdDate;
  }
  getFeaturesCategory() {
    return this.featuresCategory;
  }
  getFeatures() {
    return this.features;
  }
  getFeaturesDetails() {
    return this.featuresDetails;
  }
  getCategory() {
    return this.category;
  }
  setId(id) {
    this.id = id;
  }
  setName(furnitureName) {
    this.furnitureName = furnitureName;
  }
  setDesc(furnitureDescription) {
    this.furnitureDescription = furnitureDescription;
  }
  setOgCost(ogCost) {
    this.ogCost = ogCost;
  }
  setDiscCost(discCost) {
    this.discCost = discCost;
  }
  setModel(model) {
    this.model = model;
  }
  setImage(image) {
    this.image = image;
  }
  setVideo(video) {
    this.video = video;
  }
  setMaterial(material) {
    this.material = material;
  }
  setCreatedDate(createdDate) {
    this.createdDate = createdDate;
  }
  setFeaturesCategory(featuresCategory) {
    this.featuresCategory = featuresCategory;
  }
  setFeatures(features) {
    this.features = features;
  }
  setFeaturesDetails(featuresDetails) {
    this.featuresDetails = featuresDetails;
  }
  setCategory(category) {
    this.category = category;
  }
}

module.exports = Furniture;
