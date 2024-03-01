const express = require("express");

let FurnitureController = require('../controller/furnitureController');
const bodyParser = require("body-parser");
let app = express();

app.use(express.static("./public"));
app.use(bodyParser.json());

app.route("/furniture").get(FurnitureController.getAllFurniture);
app.route("/furniture/sofa").get(FurnitureController.getAllSofas);
// app.route("/furniture/bed").get(FurnitureController.getAllBeds);
// app.route("/furniture/table").get(FurnitureController.getAllTables);
// app.route("/furniture/chair").get(FurnitureController.getAllChairs);
// app.route("/furniture/wardrobe").get(FurnitureController.getAllWardrobes);
app.route("/furniture").post(FurnitureController.InsertFurniture);
app.route("/furniture/features").post(FurnitureController.InsertFurnitureFeatures);
app.route("/furniture/updateCost/:id").put(FurnitureController.UpdateCost);

app.listen(3030, "127.0.0.1");
console.log("Server running on port 3030");

