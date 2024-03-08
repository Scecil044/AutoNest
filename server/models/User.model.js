import mongoose from "mongoose";
import validator from "validator";
import b_crypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "The first name field is required"],
    },
    lastName: {
      type: String,
      required: [true, "The last name field is required"],
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "The Email field is required"],
      unique: [true, "Email must be a unique field"],
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
    },
    profilePicture: {
      type: String,
      default: "https://static.thenounproject.com/png/363640-200.png",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedPassword = b_crypt.hashSync(this.password, 10);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);
export default User;
