import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt_js from "bcryptjs";

// function to get users
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You do not have administrator rights!"));
  try {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find({
      ...(req.query.email && { email: req.query.email }),
      ...(req.query.firstName && { firstName: req.query.firstName }),
      ...(req.query.lastName && { lastName: req.query.lastName }),
      ...(req.query.userId && { _id: req.query.userId }),
      ...(req.query.searchTerm && {
        $or: [
          { email: { $regex: req.query.searchTerm, $options: "i" } },
          { firstName: { $regex: req.query.searchTerm, $options: "i" } },
          { lastName: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// function to delete user
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.id)
    return next(
      errorHandler(
        403,
        "You do not have permission to execute this action! A snapshot of this action will be sent to the system admin"
      )
    );
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return next(
        errorHandler(
          404,
          `No user with matching id : ${req.params.id} was found`
        )
      );
    res.status(200).json(user._id);
  } catch (error) {
    next(error);
  }
};

// update user
export const updateUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.params.id !== req.user.id && req.user.isDisabled)
    return next(
      errorHandler(404, "You do not have system rights to perform this action")
    );

  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      errorHandler(`No user with matching id ${req.params.id} was found!`)
    );
  // Check if password is provided in the request body
  let hashedPassword;
  if (req.body.password) {
    hashedPassword = bcrypt_js.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: hashedPassword,
        isDisabled: req.body.isDisabled,
        isAdmin: req.body.isAdmin,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
  try {
  } catch (error) {
    next(error);
  }
};
