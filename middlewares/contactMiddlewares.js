const { Types } = require("mongoose");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/contactModel");
const AppError = require("../utils/appError");
const { validateData } = require("../utils/userValidate");

/**
 * Validates id and checks if the user data exists
 *
 */

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) return next(new AppError(400, "Bad request"));

  const contact = await User.findById(contactId);

  if (!contact) return next(new AppError(404, "Not found"));

  req.contact = contact;

  next();
});

/**
 * Validates data User middleware
 *
 */

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid user data"));

  const existUser = await User.exists({
    email: value.email,
  });

  if (existUser)
    return next(new AppError(400, "User with this email already exists"));

  req.body = value;

  next();
});

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid user data"));

  const { id } = req.contact;

  const existUser = await User.findOne({ email: value.email });

  if (existUser && existUser.id !== id)
    return next(new AppError(400, "User with this email already exists"));

  req.body = value;

  next();
});
