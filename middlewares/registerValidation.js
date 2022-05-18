const Joi = require("joi");

module.exports = {
  signUpValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().max(16).min(6).required(),
      email: Joi.string().max(50).required(),
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
  loginUpValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().max(16).min(6).required(),
      email: Joi.string().max(50).required(),
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
  updateUserSubs: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.valid("starter", "pro", "business"),
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
  sendVerificationValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().max(50).required(),
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
