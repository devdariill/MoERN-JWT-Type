import { createPool } from "mysql2/promise";

import { DB_DATA_BASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } from "./config.js";
console.log("DB_HOST", DB_HOST);
console.log("DB_PORT", DB_PORT);
console.log("DB_USER", DB_USER);
console.log("DB_PASS", DB_PASS);
console.log("DB_DATA_BASE", DB_DATA_BASE);

export const pool = createPool(
  {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATA_BASE,
});