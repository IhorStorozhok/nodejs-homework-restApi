const { User } = require("../../models");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "rejected",
      code: 409,
      message: "Email in use",
    });
  } else {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    return res.status(201).json({
      status: "success",
      code: 409,
      data: {
        user: { email: result.email, subscription: result.subscription },
      },
    });
  }
};

module.exports = registerUser;
