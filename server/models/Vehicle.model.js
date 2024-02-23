import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
