require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/connection");
const cors = require("cors");
const { router } = require("./routes");
const cookieparser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

app.use("/api", router);

connectDb();

app.listen(3000, () => console.log("Server running on port 3000"));
