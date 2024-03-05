import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "The company name field is required"],
      unique: [true, "The company name field is a unique key"],
    },
    bannerImage: {
      type: String,
      default:
        "https://media.istockphoto.com/id/480652712/photo/dealer-new-cars-stock.jpg?s=612x612&w=0&k=20&c=Mzfb5oEeovQblEo160df-xFxfd6dGoLBkqjjDWQbd5E=",
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
