const Joi = require("joi");

module.exports = {
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(50),
      email: Joi.string().email().max(50),
      phone: Joi.string().pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults.error) {
      return res.status(404).json({
        status: "rejected",
        code: 400,
        message: validationResults.error,
      });
    }
    next();
  },
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().max(50),
      email: Joi.string().email().required().max(50),
      phone: Joi.string()
        .required()
        .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults.error) {
      return res.status(404).json({
        status: "rejected",
        code: 400,
        message: validationResults.error,
      });
    }
    next();
  },
};
