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

async function getServices() {
  try {
    const [rows] = await pool.query("SELECT * FROM services");
    return rows;
  } catch (error) {
    console.error("Error retrieving services:", error);
    throw error;
  }
}

async function getServiceById(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error retrieving service by id:", error);
    throw error;
  }
}

async function createService(name, description, price) {
  try {
    const [result] = await pool.query(
      "INSERT INTO services (name, description, price) VALUES (?, ?, ?)",
      [name, description, customer_id, price]
    );
    return { id: result.insertId, name, description, price };
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

// async function getServicesByCustomerId(customerId) {
//   try {
//     const [rows] = await pool.query(
//       `
//       SELECT * FROM services as s
//       JOIN customers_services as cs ON s.id = cs.service_id
//       WHERE cs.customer_id = ?
//       `,
//       [customerId]
//     );
//     return rows;
//   } catch (error) {
//     console.error("Error retrieving services by customer id:", error);
//     throw error;
//   }
// }

export default {
  getServices,
  getServiceById,
  createService,
  //   getServicesByCustomerId,
};
