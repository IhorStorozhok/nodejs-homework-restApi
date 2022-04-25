const { Contact } = require("../../models/index");
const responseMaker = require("../../helpers/responseMaker");

const patchContact = async (req, res) => {
  console.log("works");
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatingContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );
  updatingContact !== null
    ? responseMaker(200, res, updatingContact)
    : responseMaker(404, res, "Not found");
};

module.exports = patchContact;
