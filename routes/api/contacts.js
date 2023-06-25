const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");

router.route("/").get(listContacts).post(addContact);

router
  .route("/:contactId")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
