const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");
const AppError = require("../../utils/appError");
const { validateData } = require("../../utils/userValidate");

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid contact data"));

  const { id } = req.contact;

  const existContact = await Contact.findOne({ email: value.email });

  if (existContact && existContact.id !== id)
    return next(new AppError(400, "Contact with this email already exists"));

  req.body = value;

  next();
});
