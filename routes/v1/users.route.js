const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userController = require("../../controllers/users.controller");

const router = express.Router();

router.get("/random", userController.getRandomUser);
router.get("/all", userController.getAllUsers);
router.post("/save", userController.createUser);
router.patch("/update", userController.updateUser);

router.delete("/:id", userController.deleteUser);


module.exports = router;