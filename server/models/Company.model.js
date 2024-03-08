import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "The company name field is required"],
      unique: [true, "The company name field is a unique key"],
    },
    companyAddress: {
      type: String,
      required: [true, "The company address name field is required"],
      unique: [true, "The company address name field is a unique key"],
    },
    bannerImage: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/cars-sale-stock-row-car-600nw-636632101.jpg",
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
    status: {
      type: String,
      default: "Active",
    },
    businessType: {
      type: String,
      default: "Car Yard",
    },
    companyLogo: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/04/92/63/65/360_F_492636561_H6OAg0fwcyJL0KmlYWur44u6LTa6maOQ.jpg",
    },
    companyEmail: {
      type: String,
    },
    companyPhoneNumber: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
