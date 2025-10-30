import express from "express";
import { userModel } from "../models/userModel.js";

import {
  comparePasswordFunction,
  generateTokenFunction,
  hashPasswordFunction,
} from "../utils/auth.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    console.log("📥 Registration request received:", req.body);

    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      console.log("❌ Validation failed - missing fields");
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    const isExisting = await userModel.findOne({ username });
    if (isExisting) {
      console.log("❌ User already exists:", username);
      return res.status(409).json({
        success: false,
        message: `User Already Exists`,
      });
    }

    const hashedPassword = await hashPasswordFunction(password);
    console.log("🔒 Password hashed successfully");

    const newUser = { username, email, password: hashedPassword };
    const savedUser = await userModel.create(newUser);

    console.log("✅ User saved to database:", savedUser._id);
    console.log("📊 User details:", {
      username: savedUser.username,
      email: savedUser.email,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully ✅",
      userName: savedUser.username,
      userId: savedUser._id,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);

    res.status(500).json({
      success: false,
      message: "User registration failed 🚫",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) res.json({ success: false, message: "No such User Found" });

    const isPasswordValid = await comparePasswordFunction(
      password,
      user.password
    );
    if (!isPasswordValid)
      res.json({ success: false, message: "Incorrect Password" });

    const token = generateTokenFunction(username);
    console.log(token);
    res.json({
      success: true,
      token: token,
      message: "User Logged in Successfully ✅",
    });
  } catch (error) {
    console.error("Registration Login:", error.message);
    res.status(500).json({
      success: false,
      message: "User Login failed 🚫",
      error: error.message,
    });
  }
});

// userRouter.post("/update", async (req, res) => {
//   try {
//     const { username, password, updateUsername } = req.body;
//     if (!username || !password || !updateUsername) {
//       return res.status(400).json({
//         success: false,
//         message: "Username, password and to UpdateName are required",
//       });
//     }
//     const user = await userModel.findOne({ username });
//     if (!user) res.json({ success: false, message: "No such User Found" });

//     const isPasswordValid = await comparePasswordFunction(
//       password,
//       user.password
//     );
//     if (!isPasswordValid)
//       res.json({ success: false, message: "Incorrect Password" });

//     // Update the username and save to MongoDB
//     user.username = updateUsername;
//     const updatedUser = await user.save();
//     console.log("User updated:", updatedUser.username);

//     res.status(201).json({
//       success: true,
//       message: "User Updated successfully ✅",
//       userName: user.username,
//     });
//   } catch (error) {
//     console.error("Registration Login:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "User Update failed 🚫",
//       error: error.message,
//     });
//   }
// });

export { userRouter };
