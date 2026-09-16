const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();
const { budgetUpdate, getBudget } = require("../Controller/BudgetController");

router.patch("/", Auth, budgetUpdate);
router.get("/", Auth, getBudget);

module.exports = router;
