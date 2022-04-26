const { Contact } = require("../../models/index");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatingContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (updatingContact !== null) {
    return res.status(200).json({
      status: "successful",
      code: 200,
      data: updatingContact,
    });
  } else {
    return res.status(404).json({
      status: "rejected",
      code: 404,
      message: "Not found",
    });
  }
};

module.exports = updateContact;
