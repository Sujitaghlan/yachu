require("dotenv").config();
const bcrypt = require("bcryptjs");
const { User } = require("../models"); 
const { connectDb } = require("../config/connection"); 

const saltRounds = 10;

const seedAdmin = async () => {
  try {
    await connectDb();

    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("yachu123!", saltRounds);

    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
