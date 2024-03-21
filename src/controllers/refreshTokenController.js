import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userModel from "../models/userModel.js";

dotenv.config();

async function handleRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the user exists and the refresh token matches the one stored in the database
    const user = await userModel.getUserByEmail(decoded.email);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { username: user.username, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Send the new access token in the response
    res.json({ accessToken });
  } catch (error) {
    // Handle token verification errors
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
}

export default { handleRefreshToken };
