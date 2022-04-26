const { Contact } = require("../../models/index");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (deleteContact !== null) {
    return res.status(200).json({
      status: "successful",
      code: 200,
      message: "contact deleted",
    });
  } else {
    return res.status(404).json({
      status: "rejected",
      code: 404,
      message: "Not found",
    });
  }
};

module.exports = removeContact;
