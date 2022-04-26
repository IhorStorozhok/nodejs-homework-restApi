const { Contact } = require("../../models/index");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact !== null) {
    return res.status(200).json({
      status: "successful",
      code: 200,
      data: contact,
    });
  } else {
    return res.status(404).json({
      status: "rejected",
      code: 404,
      message: "Not found",
    });
  }
};

module.exports = getContactById;
