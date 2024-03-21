import express from "express";

import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.editUser)
  .delete(userController.deleteUser);

export default router;
