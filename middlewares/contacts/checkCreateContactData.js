const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");
const AppError = require("../../utils/appError");

const { validateData } = require("../../utils/userValidate");

/**
 * Validates data Contact middleware
 *
 */
exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid contact data"));

  const existContact = await Contact.exists({
    email: value.email,
  });

  if (existContact)
    return next(new AppError(400, "Contact with this email already exists"));

  req.body = value;

  next();
});
