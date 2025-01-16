import Joi from "joi";
import path from "path";
import dotenv from "dotenv";

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

};

module.exports = config