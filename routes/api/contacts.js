const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { contacts: contactsControllers } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(contactsControllers.listContacts));
router.post(
  "/",
  auth,
  validation.addContactValidation,
  ctrlWrapper(contactsControllers.addContact)
);
router.get("/:contactId", ctrlWrapper(contactsControllers.getContactById));
router.delete("/:contactId", ctrlWrapper(contactsControllers.removeContact));
router.put(
  "/:contactId",
  validation.updateContactValidation,
  ctrlWrapper(contactsControllers.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation.updateContactFavoriteValidation,
  ctrlWrapper(contactsControllers.patchContact)
);

module.exports = router;
