const express = require("express");
const cors = require("cors");


let FurnitureController = require('../controller/furnitureController.cjs');
let UserController = require('../controller/userController.cjs');
const bodyParser = require("body-parser");
let app = express();

app.use(express.static("./public", { maxAge: 31557600000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.route("/furniture").get(FurnitureController.getAllFurniture);
app.route("/furniture/:category").get(FurnitureController.getFurnitureByCategories);
// app.route("/furniture/bed").get(FurnitureController.getAllBeds);
// app.route("/furniture/table").get(FurnitureController.getAllTables);
// app.route("/furniture/chair").get(FurnitureController.getAllChairs);
// app.route("/furniture/wardrobe").get(FurnitureController.getAllWardrobes);
app.route("/furniture").post(FurnitureController.InsertFurniture);
app.route("/furniture/features").post(FurnitureController.InsertFurnitureFeatures);
app.route("/furniture/updateCost/:id").put(FurnitureController.UpdateCost);
app.route("/furniture/:id").get(FurnitureController.getFurnitureById);

// User route methods
app.route("/login").post(UserController.login);
app.route("/register").post(UserController.register);
app.route("/user/updateUser/:id").put(UserController.updateUser);
app.route("/user/:id").get(UserController.getUserById);
app.route("/user/changePassword/:id").put(UserController.updatePassword);

app.listen(3030, "127.0.0.1");
console.log("Server running on port 3030");

