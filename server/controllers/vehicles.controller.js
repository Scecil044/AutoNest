import Vehicle from "../models/Vehicle.model.js";
import { errorHandler } from "../utils/error.js";

// Function to create vehicle
export const createVehicle = async (req, res, next) => {
  const {
    brand,
    model,
    year,
    mileage,
    color,
    registrationNumber,
    images,
    cubicCapacity,
    description,
  } = req.body;
  if (
    !brand ||
    !model ||
    !year ||
    !mileage ||
    !color ||
    !registrationNumber ||
    !cubicCapacity ||
    mileage === "" ||
    color === "" ||
    cubicCapacity === "" ||
    brand === "" ||
    year === "" ||
    model === ""
  )
    return next(errorHandler(400, "Provide all required fields"));
  try {
    const text =
      req.body.brand +
      " " +
      req.body.model +
      " " +
      req.body.description.text +
      " " +
      req.body.registrationNumber;
    const slug = text
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const vehicle = await Vehicle.create({
      userRef: req.user.id,
      brand,
      model,
      year,
      mileage,
      color,
      registrationNumber,
      cubicCapacity,
      images,
      description,
      slug,
    });

    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

// Function to get vehicle
export const getVehicles = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const vehicles = await Vehicle.find({
      ...(req.query.brand && { brand: req.query.brand }),
      ...(req.query.model && { model: req.query.model }),
      ...(req.query.year && { year: req.query.year }),
      ...(req.query.mileage && { mileage: req.query.mileage }),
      ...(req.query.color && { color: req.query.color }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { brand: { $regex: req.query.searchTerm, $options: "i" } },
          { model: { $regex: req.query.searchTerm, $options: "i" } },
          { color: { $regex: req.query.searchTerm, $options: "i" } },
          { year: { $regex: req.query.searchTerm, $options: "i" } },
          { mileage: { $regex: req.query.searchTerm, $options: "i" } },
          { slug: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // count vehicles
    const totalVehicles = await Vehicle.countDocuments();
    res.status(200).json({ vehicles, totalVehicles });
  } catch (error) {
    next(error);
  }
};

// Function to update vehicle
export const updateVehicle = async (req, res, next) => {
  try {
    res.status(200).json("update ");
  } catch (error) {
    next(error);
  }
};

// Function to delete vehicle
export const deleteVehicle = async (req, res, next) => {
  try {
    res.status(200).json("delete new");
  } catch (error) {
    next(error);
  }
};
