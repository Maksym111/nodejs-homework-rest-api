const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");

/**
 * Get all contacts
 *
 */
exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    contacts,
  });
});
