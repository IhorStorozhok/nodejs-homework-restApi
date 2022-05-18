const { User } = require("../../models");

const userVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({
      status: "rejected",
      code: "404",
      message: "User not found",
    });
  } else {
    const userId = user._id;
    await User.findByIdAndUpdate(userId, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      status: "success",
      code: "200",
      message: "Verification successful",
    });
  }
};

module.exports = userVerification;
