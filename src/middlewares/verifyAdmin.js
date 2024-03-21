import userModel from "../models/userModel.js";

async function verifyAdmin(req, res, next) {
  try {
    const user = await userModel.getUserByEmail(req.user.email);
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default verifyAdmin;
