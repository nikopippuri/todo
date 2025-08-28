import fs from "fs";
import path from "path";
import { pool } from "./db.js";
const __dirname = import.meta.dirname;
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

// Initialize test database
const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "../db.sql"), "utf8");
  pool.query(sql, (err) => {
    if (err) {
      console.error("Error initializing test database:", err);
    } else {
      console.log("Test database initialized successfully");
    }
  });
};

const insertTestUser = (user) => {
  const { email, password } = user;
  hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return;
    }
    pool.query(
      "INSERT INTO account (email, password) VALUES ($1, $2)",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error inserting test user:", err);
        } else {
          console.log("Test user inserted successfully");
        }
      }
    );
  });
};

const getToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
};

export { initializeTestDb, insertTestUser, getToken };
