import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userModel from "../models/userModel.js";

dotenv.config();

async function register(req, res, next) {
  const { username, email, password, customerId, isAdmin = false } = req.body;

  if (!username || !email || !password || !customerId) {
    return res.status(400).json({
      message: "Username, email, password and customerId are required",
    });
  }

  const duplicitCustomer = await userModel.getUserByEmail(email);
  if (duplicitCustomer) {
    return res.status(409).json({
      message: "Customer is already registered",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.createUser(
      username,
      email,
      hashedPassword,
      customerId
    );
    res.status(201).json({ id: result.insertId, username, email, customerId });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userModel.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // TODO: Generate and return JWT
  const accessToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    MaxAge: 1000 * 60 * 60 * 24,
    sameSite: "none",
    secure: true,
  });

  res.json({ accessToken });
  // res.json({ message: "Logged in" });
}

export default {
  register,
  login,
};
