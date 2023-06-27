const catchAsync = require("../utils/catchAsync");
const User = require("../models/contactModel");
const AppError = require("../utils/appError");

/**
 * Get all contacts
 *
 */
const listContacts = catchAsync(async (req, res) => {
  const contacts = await User.find();

  res.status(200).json({
    contacts,
  });
});

/**
 * Get contact by Id
 *
 */
const getContactById = catchAsync(async (req, res, next) => {
  const { contact } = req;

  res.status(200).json({
    contact,
  });
});

/**
 * Add new contact by object - {name, email, phone}
 *
 */
const addContact = catchAsync(async (req, res, next) => {
  const newContact = await User.create({
    favorite: false,
    ...req.body,
  });

  res.status(201).json({
    contact: newContact,
  });
});

/**
 * Remove contact by Id
 *
 */
const removeContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  await User.findByIdAndDelete(contactId);

  res.status(200).json({
    message: "contact deleted",
  });
});

/**
 * Update contact by Id and body as {name, phone, email}
 *
 */
const updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const newContact = await User.findByIdAndUpdate(
    contactId,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    contact: newContact,
  });
});

const updateStatusContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean")
    return next(new AppError(400, "missing field favorite"));

  const newFavoriteStatus = await User.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    {
      new: true,
    }
  );

  res.status(200).json({
    contact: newFavoriteStatus,
  });
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
