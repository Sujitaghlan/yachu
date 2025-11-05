const express = require("express");
const { connectDb } = require("./connection/connection");

const app = express();
app.use(express.json());

connectDb();

app.listen(5000, () => console.log("Server running on port 5000"));
