const express = require("express");
const operations = require("../../models/contacts");
const {
  updateContactValidation,
  addContactValidation,
} = require("../../middlewares/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await operations.listContacts();
  res.status(200).json({
    status: "successful",
    code: 200,
    data: { ...contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.getContactById(contactId);
  contact
    ? res.status(200).json({
        status: "successful",
        code: 200,
        data: { ...contact },
      })
    : res.status(404).json({
        status: "rejected",
        code: 404,
        message: "Not found",
      });
});

router.post("/", addContactValidation, async (req, res, next) => {
  const body = req.body;

  const { name, email, phone } = body;
  const contacts = await operations.listContacts();
  const contactsNames = contacts.filter((c) => {
    return c.name === name;
  });
  if (contactsNames.length > 0) {
    res.status(409).json({
      status: "rejected",
      code: 409,
      message:
        "The contact with such name is already added. Please enter another name.",
    });
  } else {
    if (name && email && phone) {
      await operations.addContact(body);
      res
        .status(200)
        .json({ status: "successful", code: 200, data: { ...body } });
    } else {
      res.status(404).json({
        status: "rejected",
        code: 404,
        message: "missing required name field",
      });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isRemoted = await operations.removeContact(contactId);
  isRemoted
    ? res.status(200).json({
        status: "successful",
        code: 200,
        message: "contact deleted",
      })
    : res.status(404).json({
        status: "rejected",
        code: 404,
        message: "Not found",
      });
});

router.put("/:contactId", updateContactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await operations.updateContact(contactId, body);
  contact
    ? res.status(200).json({
        status: "successful",
        code: 200,
        message: "contact updated",
        data: { ...contact },
      })
    : res.status(404).json({
        status: "rejected",
        code: 404,
        message: "Not found",
      });
});

module.exports = router;
