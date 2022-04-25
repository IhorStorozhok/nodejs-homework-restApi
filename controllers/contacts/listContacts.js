const { Contact } = require("../../models/index");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  console.log("works");
  res.status(200).json({
    status: "successful",
    code: 200,
    data: { result },
  });
};

module.exports = listContacts;
