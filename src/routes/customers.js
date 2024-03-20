import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

router
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);

router.route("/:id").get(customerController.getCustomerById);

export default router;
