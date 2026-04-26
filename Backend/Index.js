const express = require("express");
const connectDB = require("./Config/db");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(3000, () => {
  console.log("Express Working");
});
