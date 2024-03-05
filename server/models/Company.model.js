import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "The company name field is required"],
      unique: [true, "The company name field is a unique key"],
    },
    city: {
      type: String,
      required: [true, "The city field is required"],
    },
    country: {
      type: String,
      required: [true, "The country field is required"],
    },
    joined: {
      type: String,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
