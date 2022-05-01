const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!user) {
    return res.status(401).json({
      status: "rejected",
      code: "401",
      message: "Email or password is wrong",
    });
  } else {
    if (!comparePassword) {
      return res.status(401).json({
        status: "rejected",
        code: "401",
        message: "Email or password is wrong",
      });
    } else {
      const payload = { id: user.id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
      await User.findByIdAndUpdate(user.id, { token });
      res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
  }
};

module.exports = loginUser;
