const { createTransaction } = require("../Controller/TransactionController");
const express = require("express");

const router = express.Router();

router.post("/", createTransaction);

module.exports = router;
