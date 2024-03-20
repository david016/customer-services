import express from "express";

import serviceController from "../controllers/serviceController.js";

const router = express.Router();

router
  .route("/")
  .get(serviceController.getServices)
  .post(serviceController.createService);

router.route("/:id").get(serviceController.getServiceById);

export default router;
