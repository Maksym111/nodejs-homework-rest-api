const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");

/**
 * Add new contact by object - {name, email, phone}
 *
 */
exports.addContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create({
    favorite: false,
    ...req.body,
  });

  res.status(201).json({
    contact: newContact,
  });
});
