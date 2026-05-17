const {
  createTransaction,
  deleteTransaction,
  stats,
  updateTransaction,
  normalView,
  mainFilter,
} = require("../Controller/TransactionController");
const express = require("express");
const Auth = require("../middleware/UserAuth");
const router = express.Router();

router.post("/", Auth, createTransaction);
router.delete("/:id", Auth, deleteTransaction);
router.get("/stats", Auth, stats);
router.get("/", Auth, mainFilter);
router.patch("/:id", Auth, updateTransaction);
module.exports = router;
