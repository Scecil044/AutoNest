import Joi from "joi";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example usage
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);


dotenv.config({ path: path.join(__dirname, "../../.env")});

const envVarsSchema = Joi.object().keys({
    PORT: Joi.number().required(),
    ENV: Joi.string().required().valid("development", "production", "test"),
}).unknown();

const {error, value: envVars} = envVarsSchema.prefs({
    errors: { label: "key" }
}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    port: envVars.PORT,
    env: envVars.ENV
};

export default config