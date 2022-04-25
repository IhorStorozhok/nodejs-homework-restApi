const { Contact } = require("../../models/index");
const responseMaker = require("../../helpers/responseMaker");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  deleteContact !== null
    ? responseMaker(200, res, "contact deleted")
    : responseMaker(404, res, "Not found");
};

module.exports = removeContact;
