const express = require("express");
const connectDB = require("./Config/db");
const errorMid = require("./middleware/errorMid");
const cors = require("cors");
const userRou = require("./routes/UserRoute");
const dotenv = require("dotenv");
const cookiePArser = require("cookie-parser");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookiePArser());

app.use("/user", userRou);

app.use(errorMid);
app.listen(process.env.PORT || 5000, () => {
  console.log("Express Working");
});
