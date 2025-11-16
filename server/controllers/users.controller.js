const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
//const admin = require("../config/firebaseAdmin");
const { uploadBufferToCloudinary } = require("../utils/uploadBufferToCloudinary");
const axios = require("axios");
const { sendOTPEmail } = require("../utils/nodemailer");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let imageUrl = null;
    let imagePublicId = null;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, "users");
    imageUrl = result.url;
    imagePublicId = result.publicId;

    const user = await User.create({
      email,
      password: hashedPassword,
      imageUrl,
      imagePublicId,
    });

    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        imageUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error in server", err: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    const accessToken = jwt.sign(
      { userId: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in database
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login Successfully",
      accessToken,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error in server", err: err.message });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No refresh token provided" });
  }

  try {
    // Verify the refresh token structure first
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID from token AND check if refresh token matches
    const user = await User.findOne({
      _id: decoded.userId,
      refreshToken: refreshToken,
    });

    if (!user) {
      // Token is valid but not found in DB - possible token reuse/compromise
      return res.status(403).json({
        message: "Forbidden - Invalid refresh token",
      });
    }

    // Issue new access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      message: "Token refreshed successfully",
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Forbidden - Token expired" });
    }

    res.status(500).json({
      message: "Server error during token refresh",
      error: err.message,
    });
  }
};

const googleLogin = async (req, res) => {
  const { idToken } = req.body; // Firebase ID token from frontend

  if (!idToken) return res.status(400).json({ message: "ID token required" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let imageUrl = null;
    let imagePublicId = null;
    if (picture) {
      const response = await axios.get(picture, {
        responseType: "arraybuffer",
      });
      const { url, publicId } = await uploadBufferToCloudinary(
        Buffer.from(response.data, "binary"),
        "users"
      );
      imageUrl = url;
      imagePublicId = publicId;
    }

    let user = await User.findOne({ googleId: uid });
    if (!user) {
      user = await User.create({
        googleId: uid,
        name,
        email,
        imageUrl,
        imagePublicId,
      });
    } else if (!user.imageUrl) {
      user.imageUrl= imageUrl;
      user.imagePublicId = imagePublicId;
      await user.save();
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Firebase ID token" });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: false,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({
      message: "Server error during logout",
      error: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    await sendOTPEmail(email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;
  // const email = req.params.email

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is requried",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified",
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one",
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, email } = req.body;
  //const email = req.params.email

  if (!newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successsfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  refresh,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
