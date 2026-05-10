const {
  createTransaction,
  deleteTransaction,
  stats,
} = require("../Controller/TransactionController");
const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();

router.post("/", Auth, createTransaction);
router.delete("/:id", Auth, deleteTransaction);
router.get("/", Auth, stats);
module.exports = router;
