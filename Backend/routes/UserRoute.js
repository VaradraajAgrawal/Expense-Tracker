const express = require("express");
const {
  createUser,
  getUserId,
  userLogin,
  refreshToken,
} = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.post("/newUser", createUser);
UserRouter.get("/:id", getUserId);
UserRouter.post("/login", userLogin);
UserRouter.get("/refresh", refreshToken);
module.exports = UserRouter;
