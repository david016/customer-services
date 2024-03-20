import userModel from "../models/userModel.js";

async function getUsers(req, res, next) {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  const { username, email, password, customerId } = req.body;

  if (!username || !email || !password || !customerId) {
    return res.status(400).json({
      message: "Username, email, password and customerId are required",
    });
  }

  try {
    const result = await userModel.createUser(
      username,
      email,
      password,
      customerId
    );
    res.status(201).json({ id: result.insertId, username, email, customerId });
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = { id, ...req.body };
    const result = await userModel.editUser(user);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const result = await userModel.deleteUser(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
