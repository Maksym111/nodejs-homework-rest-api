const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  checkContactById,
  checkCreateContactData,
  checkUpdateContactData,
} = require("../../middlewares/contactMiddlewares");

router.route("/").get(listContacts).post(checkCreateContactData, addContact);

router.use("/:contactId", checkContactById);

router
  .route("/:contactId")
  .get(getContactById)
  .delete(removeContact)
  .put(checkUpdateContactData, updateContact)
  .patch(updateStatusContact);

module.exports = router;
