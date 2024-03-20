import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

async function addServiceToCustomer(customerId, serviceId) {
  try {
    const [result] = await pool.query(
      "INSERT INTO customers_services (customer_id, service_id) VALUES (?, ?)",
      [customerId, serviceId]
    );
    return {
      id: result.insertId,
      customer_id: customerId,
      service_id: serviceId,
    };
  } catch (error) {
    console.error("Error adding service to customer:", error);
    throw error;
  }
}

async function deleteServiceFromCustomer(customerId, serviceId) {
  try {
    const [result] = await pool.query(
      "DELETE FROM customers_services WHERE customer_id = ? AND service_id = ?",
      [customerId, serviceId]
    );
    return result;
  } catch (error) {
    console.error("Error deleting service from customer:", error);
    throw error;
  }
}

async function deleteCustomerServices(customerId) {
  try {
    const [result] = await pool.query(
      "DELETE FROM customers_services WHERE customer_id = ?",
      [customerId]
    );
    return result;
  } catch (error) {
    console.error("Error deleting customer services:", error);
    throw error;
  }
}

export default {
  addServiceToCustomer,
  deleteServiceFromCustomer,
  deleteCustomerServices,
};
