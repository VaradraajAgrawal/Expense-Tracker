const express = require("express");
const connectDB = require("./Config/db");
const errorMid = require("./middleware/errorMid");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use(errorMid);
app.listen(5000, () => {
  console.log("Express Working");
});
