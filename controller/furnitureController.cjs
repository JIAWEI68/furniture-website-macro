"use strict";

const furnitureDB = require("../database/furnitureDB.cjs");
const Furniture = require("../models/furniture.cjs");

let FurnitureDB = new furnitureDB();

function getAllFurniture(req, res) {
  FurnitureDB.getAllFurniture((err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result);
    }
  });
}

function getFurnitureById(req, res) {
  FurnitureDB.getFurnitureById(parseInt(req.params.id), (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(result);
  });
}

function getFurnitureByCategories(req, res) {
  FurnitureDB.getFurnitureByCategories(
    req.params.category,
    (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
}

function InsertFurniture(req, res) {
  FurnitureDB.InsertFurniture(
    req.body.furnitureName,
    req.body.furnitureDescription,
    req.body.ogCost,
    req.body.discCost,
    req.body.model,
    req.body.thumbnail,
    req.body.image,
    req.body.video,
    req.body.material,
    req.body.category,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
}

function InsertFurnitureFeatures(req, res) {
  FurnitureDB.InsertFeatures(
    req.body.featuresCategory,
    req.body.features,
    req.body.featuresDetails,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
}

function UpdateCost(req, res) {
  FurnitureDB.UpdateCost(
    parseInt(req.params.id),
    parseFloat(req.body.percent),
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    }
  );
}

module.exports = {
  getAllFurniture,
  getFurnitureByCategories,
  InsertFurniture,
  InsertFurnitureFeatures,
  UpdateCost,
  getFurnitureById
};
