const { User } = require("../../models");

const userSudsUpdate = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { subscription } = req.body;
  const data = await User.findByIdAndUpdate({ _id }, { subscription });
  if (!data) {
    return res.status(400).json({
      status: "rejected",
      code: 400,
      message: "There is no user with such id.",
    });
  } else {
    return res.status(200).json({
      status: "successful",
      code: 200,
      data: {
        email: data.email,
        subscription: data.subscription,
      },
    });
  }
};

module.exports = userSudsUpdate;
