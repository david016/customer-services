import customerModel from "../models/customerModel.js";

async function getCustomers(req, res, next) {
  try {
    const customers = await customerModel.getCustomers();
    res.json(customers);
  } catch (error) {
    next(error);
  }
}

async function getCustomerById(req, res, next) {
  try {
    const id = req.params.id;
    const customer = await customerModel.getCustomerById(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function createCustomer(req, res, next) {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  try {
    const result = await customerModel.createCustomer(name, email, password);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    next(error);
  }
}

async function getCustomerServices(req, res, next) {
  try {
    const id = req.params.id;
    const customer = await customerModel.getCustomerById(id);
    res.json(customer.services);
  } catch (error) {
    next(error);
  }
}

async function editCustomer(req, res, next) {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const result = await customerModel.editCustomer(id, name, email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    const id = req.params.id;
    await customerModel.deleteCustomer(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerServices,
};
