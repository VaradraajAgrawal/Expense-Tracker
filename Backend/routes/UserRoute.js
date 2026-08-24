const express = require("express");
const {
  createUser,
  getUserId,
  userLogin,
  refreshToken,
  loggedInUser,
} = require("../Controller/UserController");
const AuthFunction = require("../middleware/UserAuth");
const UserRouter = express.Router();

UserRouter.post("/newUser", createUser);
UserRouter.post("/login", userLogin);
UserRouter.get("/", AuthFunction, loggedInUser);
UserRouter.get("/refresh", refreshToken);

UserRouter.get("/:id", getUserId);
module.exports = UserRouter;
