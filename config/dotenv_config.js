import dotenv from "dotenv";
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const urlMongoDB = process.env.URLMONGODB;
export const database_type = process.env.DATABASE_TYPE;
export const smtp_port = process.env.SMTP_PORT;
export const admin_email = process.env.ADMIN_EMAIL;
export const admin_password = process.env.ADMIN_PASSWORD;
export const accountSID = process.env.ACCOUNTSID;
export const authToken = process.env.AUTHTOKEN;
export const twilio_PhoneNumber = process.env.TWILIO_PHONE;
export const session_key = process.env.SESSIONKEY;
export const JWT_secret_key = process.env.JWT_SECRET;
