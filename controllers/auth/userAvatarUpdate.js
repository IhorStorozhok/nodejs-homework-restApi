const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const Jimp = require("jimp");

const userAvatarUpdate = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { id } = req.user;

  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      imageName
    );
    await Jimp.read(tempUpload)
      .then((img) => {
        return img.resize(250, 250).write(tempUpload);
      })
      .catch((err) => {
        console.error(err);
      });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarUrl: avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = userAvatarUpdate;
