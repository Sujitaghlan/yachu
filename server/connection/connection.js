const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yachu");
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Connection to DB failed");
  }
};

module.exports = {connectDb};
