const { Contact } = require("../../models/index");
const responseMaker = require("../../helpers/responseMaker");

const addContact = async (req, res) => {
  const { body } = req;
  const isAlreadyInDB =
    (await Contact.findOne({ name: body.name })) ||
    (await Contact.findOne({ email: body.email }));
  if (isAlreadyInDB) {
    responseMaker(
      409,
      res,
      "The contact with such properties is already added."
    );
  } else {
    const data =
      body.favorite === undefined ? { ...body, favorite: false } : { ...body };
    const result = await Contact.create(data);
    responseMaker(201, res, result);
  }
};

module.exports = addContact;
