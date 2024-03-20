import express from "express";

import serviceController from "../controllers/serviceController.js";

const router = express.Router();

router
  .route("/")
  .get(serviceController.getServices)
  .post(serviceController.createService);

router.route("/:id").get(serviceController.getServiceById);

// router.route("/:id").get(customerController.getCustomerById);
// router.route("/:id/services").get(customerController.getCustomerServices);

export default router;
