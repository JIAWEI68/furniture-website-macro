"use strict";

let db = require("../server/connection.cjs");

class FurnitureDB {
  getAllFurniture(callback) {
    let sql =
      "SELECT A.id, A.furnitureName, A.furnitureDescription, A.ogCost, A.discCost, A.model, A.image, A.video, A.material, A.category, A.createdDate, B.featuresCategory, B.features, B.featuresDetails FROM furniture AS A INNER JOIN furnitureFeatures AS B ON A.id = B.id";
    db.query(sql, callback);
  }
  getFurnitureById(id, callback) { 
    let sql =
      "SELECT A.id, A.furnitureName, A.furnitureDescription, A.ogCost, A.discCost, A.model, A.image, A.video, A.material, A.category, A.createdDate, B.featuresCategory, B.features, B.featuresDetails FROM furniture AS A INNER JOIN furnitureFeatures AS B ON A.id = B.id AND A.id = ?";
    db.query(sql, [id], callback);
  }
  getSofas(callback) {
    let sql =
      "SELECT * FROM furniture AS A INNER JOIN furnitureFeatures AS B ON A.id = B.id AND A.category = 'Sofa'";
    db.query(sql, callback);
  }
  InsertFurniture(
    furnitureName,
    furnitureDescription,
    ogCost,
    discCost,
    model,
    image,
    video,
    material,
    category,
    callback
  ) {
    let sql =
      "INSERT INTO furniture (furnitureName, furnitureDescription, ogCost, discCost, model, image, video, material, category, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?);";
    db.query(
      sql,
      [
        furnitureName,
        furnitureDescription,
        ogCost,
        discCost,
        model,
        image,
        video,
        material,
        category,
        new Date()
      ],
      callback
    );
    console.log("Furniture Inserted");
  }
  InsertFeatures(featuresCategory, features, featuresDetails, callback) {
    let sql =
      "SELECT MAX(id) INTO @id FROM furniture; INSERT INTO furnitureFeatures (id, featuresCategory, features, featuresDetails) VALUES (@id,?,?,?)";
    db.query(sql, [featuresCategory, features, featuresDetails], callback);
  }
  UpdateCost(id, percent, callback) {
    let sql = "UPDATE furniture SET discCost = ogCost * ? WHERE id = ?;";
    return db.query(sql, [percent, id], callback);
  }
}

module.exports = FurnitureDB;
