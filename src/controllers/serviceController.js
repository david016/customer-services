import serviceModel from "../models/serviceModel.js";

async function getServices(req, res, next) {
  try {
    const services = await serviceModel.getServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
}

async function getServiceById(req, res, next) {
  try {
    const id = req.params.id;
    const service = await serviceModel.getServiceById(id);
    res.json(service);
  } catch (error) {
    next(error);
  }
}

async function createService(req, res, next) {
  try {
    const { name, customer_id, description, price } = req.body;
    const service = await serviceModel.createService(
      name,
      customer_id,
      description,
      price
    );
    res.json(service);
  } catch (error) {
    next(error);
  }
}

export default {
  getServices,
  getServiceById,
  createService,
};
