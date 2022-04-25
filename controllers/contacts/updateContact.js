const { Contact } = require("../../models/index");
const responseMaker = require("../../helpers/responseMaker");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatingContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  updatingContact !== null
    ? responseMaker(200, res, updatingContact)
    : responseMaker(404, res, "Not found");
};

module.exports = updateContact;
