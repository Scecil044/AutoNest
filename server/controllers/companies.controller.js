import Company from "../models/Company.model.js";
import { errorHandler } from "../utils/error.js";

// function to get companies
export const getCompanies = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const companies = await Company.find({
      ...(req.query.companyName && {
        companyName: { $regex: req.query.companyName, $options: "i" },
      }),
      ...(req.query.city && {
        city: { $regex: req.query.city, $options: "i" },
      }),
      ...(req.query.country && {
        country: { $regex: req.query.country, $options: "i" },
      }),
      ...(req.query.userId && { userRef: req.query.userRef }),
      ...(req.query.companyId && { _id: req.query.companyId }),
      ...(req.query.searchTerm && {
        $or: [
          { companyName: { $regex: req.query.searchTerm, $options: "i" } },
          { city: { $regex: req.query.searchTerm, $options: "i" } },
          { country: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .populate("userRef", "firstName lastName userName email")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalCompanies = await Company.countDocuments();

    res.status(200).json({ companies, totalCompanies });
  } catch (error) {
    next(error);
  }
};

// function to update company
export const createCompany = async (req, res, next) => {
  const {
    companyName,
    companyLogo,
    city,
    country,
    businessType,
    companyEmail,
    companyAddress,
    companyPhoneNumber,
    userRef,
    status,
  } = req.body;
  // check if user has admin flag
  if (!req.user.isAdmin)
    return next(
      errorHandler(404, "You do not have rights to complete this action!")
    );
  try {
    // check if company name is taken
    const company = await Company.findOne({ companyName });
    //return an error
    if (company) return next(errorHandler(404, "Company name already taken!"));
    // create company
    //current date
    const joined = new Date().getFullYear();
    const newCompany = await Company.create({
      companyName,
      status,
      companyPhoneNumber,
      companyAddress,
      companyEmail,
      companyLogo,
      businessType,
      city,
      country,
      userRef,
      joined,
      createdBy: req.user.id,
    });

    const createdCompany = await newCompany.populate(
      "userRef createdBy",
      "firstName lastName email"
    );
    res.status(200).json(createdCompany);
  } catch (error) {
    next(error);
  }
};

// function to update company
export const updateCompany = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(
      errorHandler(403, "You do not have rights to complete this action")
    );
  const {
    companyName,
    city,
    country,
    status,
    businessType,
    companyLogo,
    userRef,
  } = req.body;
  try {
    //find company in database
    const company = await Company.findById(req.params.companyId);
    if (!company)
      return next(
        errorHandler(
          404,
          `No company with matching id ${req.params.companyId} was found`
        )
      );
    // handle update
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.companyId,
      {
        $set: {
          companyName,
          city,
          country,
          status,
          companyLogo,
          businessType,
          userRef,
          updatedBy: req.user.id,
        },
      },
      { new: true }
    ).populate("userRef updatedBy", "firstName lastName userName email");

    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

// function to delete company
export const deleteCompany = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(
      errorHandler(403, "You do not have rights to complete this action")
    );
  try {
    //find company in database
    const company = await Company.findById(req.params.companyId);
    if (!company)
      return next(
        errorHandler(
          404,
          `No company with matching id ${req.params.companyId} was found`
        )
      );
    // Handle delete
    await Company.findByIdAndDelete(req.params.companyId);
    res.status(200).json("Company deleted successfully!");
  } catch (error) {
    next(error);
  }
};
