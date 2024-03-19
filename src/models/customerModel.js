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
    return customer;
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

export default { getCustomers, getCustomerById, createCustomer };
