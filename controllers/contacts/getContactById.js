const { Contact } = require("../../models/index");
const responseMaker = require("../../helpers/responseMaker");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  contact !== null
    ? responseMaker(200, res, contact)
    : responseMaker(404, res, "Not found");
};
module.exports = getContactById;
