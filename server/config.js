import {config} from "dotenv"
config()

export const JWT_SECRET =  process.env.JWT_SECRET || 'secretkey';
export const PORT = process.env.PORT || 3000

export const BK_PORT = 3000;
export const DB_HOST = process.env.HOST || 'localhost'; 
export const DB_PORT = process.env.PORT || 3306;
export const DB_USER = process.env.USER || 'root';
export const DB_PASS = process.env.PASS || 'ronald1230';
export const DB_DATA_BASE = process.env.DATA_BASE || 'bdempresa';