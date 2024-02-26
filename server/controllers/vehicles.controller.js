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

      ...(req.query.color && { color: req.query.color }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { brand: { $regex: req.query.searchTerm, $options: "i" } },
          { model: { $regex: req.query.searchTerm, $options: "i" } },
          { color: { $regex: req.query.searchTerm, $options: "i" } },
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

// function to fetch popular vehicles
export const popularVehicles = async (req, res, next) => {
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  try {
    const popularCars = await Vehicle.find({
      $or: [
        { brand: { $regex: /toyota|mazda/i } },
        {
          model: {
            $regex:
              /fielder|cx5|swift|golf|axio|tiguan|m5|c200|tx|crown|ranger/i,
          },
        },
      ],
    }).sort({ createdAt: sortDirection });
    res.status(200).json(popularCars);
  } catch (error) {
    next(error, "an error was encountered, could not fetch popular cars");
  }
};

// function to fetch top spec models
export const fetchTopSpecModels = async (req, res, next) => {
  try {
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const topSpecCars = await Vehicle.find({
      $or: [
        {
          brand: {
            $regex:
              /mercedes|bmw|ford|volkswagen|porsche|chevrolet|range|land rover|audi/i,
          },
        },
        { cubicCapacity: { $gte: 3000 } },
      ],
    }).sort({ createdAt: sortDirection });
    res.status(200).json(topSpecCars);
  } catch (error) {
    next(error);
  }
};
// Function to update vehicle
export const updateVehicle = async (req, res, next) => {
  const {
    brand,
    year,
    model,
    registrationNumber,
    cubicCapacity,
    color,
    description,
    mileage,
    images,
  } = req.body;
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle)
      return next(
        errorHandler(
          404,
          `No vehicle with matching id ${req.params.id} was found`
        )
      );
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          model,
          year,
          brand,
          registrationNumber,
          cubicCapacity,
          color,
          description,
          mileage,
          images,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedVehicle);
  } catch (error) {
    next(error);
  }
};

// Function to delete vehicle
export const deleteVehicle = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(
      errorHandler(403, "You do not have permission to complete this action")
    );
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle)
      return next(
        errorHandler(
          404,
          `No vehicle with matching id ${req.params.id} was found`
        )
      );
    if (req.user.id !== vehicle.userRef.toString())
      return next(
        errorHandler(
          403,
          "Forbidden. You have no rights to complete this action"
        )
      );
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json("Vehicle deletion successful");
  } catch (error) {
    next(error);
  }
};
