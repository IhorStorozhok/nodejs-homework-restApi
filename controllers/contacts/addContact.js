const { Contact } = require("../../models/index");

const addContact = async (req, res) => {
  const { body } = req;
  const isAlreadyInDB = await Contact.findOne({ name: body.name });
  if (isAlreadyInDB) {
    return res.status(409).json({
      status: "rejected",
      code: 409,
      message: "The contact with such name is already added.",
    });
  } else {
    const { id } = req.user;
    const data =
      body.favorite === undefined
        ? { ...body, favorite: false, owner: id }
        : { ...body, owner: id };
    const result = await Contact.create(data);
    return res.status(201).json({
      status: "successful",
      code: 201,
      data: result,
    });
  }
};

module.exports = addContact;
