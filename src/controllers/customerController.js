import customerModel from "../models/customerModel.js";

async function getCustomers(req, res) {
  try {
    const customers = await customerModel.getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const id = req.params.id;
    const customer = await customerModel.getCustomerById(id);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCustomer(req, res) {
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
    res.status(500).json({ message: error.message });
  }
}

export default { getCustomers, getCustomerById, createCustomer };
