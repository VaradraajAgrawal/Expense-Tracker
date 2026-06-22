const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();
const budgetUpdate = require("../Controller/BudgetController");

router.patch("/", Auth, budgetUpdate);

module.exports = router;
