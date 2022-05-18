const express = require("express");
const {
  ctrlWrapper,
  registerValidation,
  auth,
  upload,
} = require("../../middlewares");
const { register: registerControllers } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  registerValidation.signUpValidation,
  ctrlWrapper(registerControllers.registerUser)
);
router.post(
  "/login",
  registerValidation.loginUpValidation,
  ctrlWrapper(registerControllers.loginUser)
);
router.get(
  "/current",
  ctrlWrapper(auth),
  ctrlWrapper(registerControllers.getCurrentUser)
);
router.get("/logout", auth, registerControllers.logoutUser);

router.patch(
  "/",
  auth,
  registerValidation.updateUserSubs,
  registerControllers.userSudsUpdate
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  registerControllers.userAvatarUpdate
);

router.get(
  "/verify/:verificationToken",
  ctrlWrapper(registerControllers.userVerification)
);

router.post(
  "/verify",
  registerValidation.sendVerificationValidation,
  ctrlWrapper(registerControllers.sendUserVerification)
);

module.exports = router;
