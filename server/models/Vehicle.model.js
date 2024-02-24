import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    cubicCapacity: {
      type: Number,
      required: true,
    },
    description: {
      type: Object,
    },
    images: {
      type: Array,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
