const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");

/**
 * Remove contact by Id
 *
 */
exports.removeContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({
    message: "contact deleted",
  });
});
