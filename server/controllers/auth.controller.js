import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt_js from "bcryptjs";

// Function to register new user
export const registerUser = async (req, res, next) => {
  // Ensure fields are not blank
  const { firstName, lastName, email, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    firstName === "" ||
    lastName === "" ||
    password === ""
  )
    return next(errorHandler(400, "Please provide all required fields!"));
  try {
    // Check if email is already taken
    const emailExists = await User.findOne({ email });
    if (emailExists) return next(errorHandler(400, "Email already taken!"));

    // function to generate userName
    const generateUserName = (firstName, lastName) => {
      const firstNameLower = firstName.charAt(0).toLowerCase();
      const lastNameUpper = lastName.charAt(0).toUpperCase();
      const restOfLastName = lastName.slice(1).toLowerCase();

      return (
        firstNameLower +
        lastNameUpper +
        restOfLastName +
        Math.floor(100 + Math.random() * 900).toString()
      );
    };
    let generatedUserName = generateUserName(firstName, lastName);
    const userNameTaken = await User.findOne({ userName: generatedUserName });
    if (userNameTaken)
      return next(errorHandler(400, "User name already taken!"));
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      userName: generatedUserName,
      email,
      password,
    });
    // return new user with password excluded
    newUser.password = undefined;
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

// Function to login user
export const login = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email || password === "" || email === "")
    return next(errorHandler(400, "input all required fields"));
  try {
    const isValidUser = await User.findOne({ email });
    const isValidPassword = bcrypt_js.compareSync(
      password,
      isValidUser.password
    );
    if (!isValidPassword || !isValidUser)
      return next(errorHandler(403, "Invalid credentials"));

    //Check if account is disabled
    if (isValidUser.isDisabled)
      return next(
        errorHandler(
          403,
          "Your account is disabled. This may take a few days before restoration. Contact the system admin for more details"
        )
      );
    // generate token
    const token = jwt.sign(
      { id: isValidUser._id, isAdmin: isValidUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = isValidUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//  logout function
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json("Logout successful");
  } catch (error) {
    next(error);
  }
};
