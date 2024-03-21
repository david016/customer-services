import express from "express";

import customerController from "../controllers/customerController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .delete(verifyAdmin, customerController.deleteCustomer)
  .put(customerController.editCustomer);
router.route("/:id/services").get(customerController.getCustomerServices);

export default router;
