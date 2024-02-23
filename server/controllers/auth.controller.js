import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";

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
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
