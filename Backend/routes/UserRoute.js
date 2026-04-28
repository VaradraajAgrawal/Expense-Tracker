const express = require("express");
const { createUser, getUserId } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.post("/newUser", createUser);
UserRouter.get("/:id", getUserId);

module.exports = UserRouter;
