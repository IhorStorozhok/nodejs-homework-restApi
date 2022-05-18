const { User } = require("../../models");
const { mailSender } = require("../../helpers");

const sendUserVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "rejected",
      code: 404,
      message: "There is not users with  such email. ",
    });
  }
  if (user.verify) {
    return res.status(409).json({
      message: "Verification has already been passed",
    });
  } else {
    const { verificationToken } = user;
    if (verificationToken === null) {
      return res.status(404).json({
        status: "rejected",
        code: 404,
        message: "Checked verificationToken",
      });
    }

    const mailBody = `<a href="http://localhost:3000/api/users/verify/${verificationToken}">
     <button style="color: blue; font-size: 24px; font-weight: bold; text-decoration: none;width:128px;height:64px; border-radius:50%"> Confrim registration </button>;;
      </a>`;
    mailSender(email, "Please confrim your registration", mailBody);

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }
};

module.exports = sendUserVerification;
