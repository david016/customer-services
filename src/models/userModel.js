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

async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return user[0];
  } catch (error) {
    console.error(`Error retrieving user with id ${id}:`, error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return user[0];
  } catch (error) {
    console.error(`Error retrieving user with email ${email}:`, error);
    throw error;
  }
}

async function createUser(username, email, password, customerId) {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password, customer_id) VALUES ( ?, ?, ?, ?)",
      [username, email, password, customerId]
    );
    return { id: result.insertId, username, email, password, customerId };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function editUser(id, username, email, password) {
  try {
    const [result] = await pool.query(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
      [username, email, password, id]
    );
    return result;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  editUser,
  deleteUser,
};
