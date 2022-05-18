const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { mailSender } = require("../../helpers");

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
    const avatarUrl = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = nanoid();
    const result = await User.create({
      email,
      password: hashPassword,
      avatarUrl,
      verificationToken,
    });
    const mailBody = `<a href="http://localhost:3000/api/users/verify/${verificationToken}">
     <button style="color: blue; font-size: 24px; font-weight: bold; text-decoration: none;width:128px;height:64px; border-radius:50%"> Confrim registration </button>;;
      </a>`;

    mailSender(email, "Please confrim your registration", mailBody);

    return res.status(201).json({
      status: "success",
      code: 409,
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
          verificationToken,
        },
      },
    });
  }
};

module.exports = registerUser;
