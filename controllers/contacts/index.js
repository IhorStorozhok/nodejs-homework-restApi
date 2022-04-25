const listContacts = require("./listContacts");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const patchContact = require("./patchContact");

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  patchContact,
};
