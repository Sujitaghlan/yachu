require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/connection");
const { router } = require("./routes");
const cookieparser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieparser());

app.use("/api", router);

connectDb();

app.listen(3000, () => console.log("Server running on port 3000"));
