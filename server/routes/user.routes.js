const express = require("express");
const userController = require("../controllers/user.controller");

const userRoutes = express.Router();

userRoutes.route("/register").post(userController.register);
userRoutes.route("/login").post(userController.login);
// userRoutes.route("/verify").get(userController.verify);
// userRoutes.route("/").get(userController.getUser);

module.exports = userRoutes;
