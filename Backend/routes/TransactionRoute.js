const {
  createTransaction,
  deleteTransaction,
} = require("../Controller/TransactionController");
const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();

router.post("/", Auth, createTransaction);
router.delete("/:id", Auth, deleteTransaction);
module.exports = router;
