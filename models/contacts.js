const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const allCurrentContacts = JSON.parse(data);
  return allCurrentContacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const [requestedContact] = data.filter((c) => {
    return c.id === contactId;
  });
  return requestedContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const requestedContacts = data.filter((c) => {
    return c.id !== contactId;
  });
  if (data.length - requestedContacts.length === 1) {
    await fs.writeFile(contactsPath, JSON.stringify(requestedContacts));
    return true;
  } else {
    return false;
  }
};

const addContact = async (body) => {
  const data = await listContacts();
  const contactWithId = {
    id: nanoid(),
    ...body,
  };
  const newData = [...data, contactWithId];
  await fs.writeFile(contactsPath, JSON.stringify(newData));
  return contactWithId;
};

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (contact) {
    await removeContact(contactId);

    const contacts = await listContacts();
    if (body.name) {
      contact.name = body.name;
    }
    if (body.phone) {
      contact.phone = body.phone;
    }
    if (body.email) {
      contact.email = body.email;
    }
    const newData = [contact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(newData));

    return contact;
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
