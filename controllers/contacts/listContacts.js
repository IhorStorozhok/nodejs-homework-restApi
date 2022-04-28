const { Contact } = require("../../models/index");

const listContacts = async (req, res) => {
  const { id } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner: id, favorite: true } : { owner: id };
  const result = await Contact.find(filter, "", {
    skip: skip,
    limit: Number(limit),
  }).populate("owner", "id email");
  res.status(200).json({
    status: "successful",
    code: 200,
    data: { result },
  });
};

module.exports = listContacts;
