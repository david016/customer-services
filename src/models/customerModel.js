import mysql from "mysql2";
import dotenv from "dotenv";

import customerServiceModel from "./customerServiceModel.js";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

async function getCustomers() {
  try {
    const [rows] = await pool.query("SELECT * FROM customers");
    return rows;
  } catch (error) {
    console.error("Error retrieving customers:", error);
    throw error;
  }
}

async function getCustomerById(id) {
  try {
    const [customer] = await pool.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );
    const services = await getCustomerServices(id);
    return { ...customer[0], services };
  } catch (error) {
    console.error(`Error retrieving customer with id ${id}:`, error);
    throw error;
  }
}

async function createCustomer(name, email, password) {
  try {
    const [result] = await pool.query(
      "INSERT INTO customers (name, email, password) VALUES ( ?, ?, ?)",
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

async function editCustomer(customer) {
  try {
    let query = "UPDATE customers SET ";
    let values = [];

    for (let key in customer) {
      if (customer.hasOwnProperty(key) && key !== "id") {
        query += `${key} = ?, `;
        values.push(customer[key]);
      }
    }

    query = query.slice(0, -2); // Remove the last comma and space
    query += " WHERE id = ?";
    values.push(customer.id);

    const [result] = await pool.query(query, values);
    return { id: customer.id, name: customer.name, email: customer.email };
  } catch (error) {
    console.error("Error editing customer:", error);
    throw error;
  }
}

async function deleteCustomer(id) {
  try {
    await customerServiceModel.deleteCustomerServices(id);
    const [result] = await pool.query("DELETE FROM customers WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}

async function getCustomerServices(customerId) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * FROM services as s 
      JOIN customers_services as cs ON s.id = cs.service_id 
      WHERE cs.customer_id = ?
      `,
      [customerId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving customer services:", error);
    throw error;
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
