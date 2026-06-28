const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();
const {
  budgetUpdate,
  budgetTransactionUpdate,
} = require("../Controller/BudgetController");

router.patch("/", Auth, budgetUpdate);
router.get("/", Auth, budgetTransactionUpdate);

module.exports = router;
