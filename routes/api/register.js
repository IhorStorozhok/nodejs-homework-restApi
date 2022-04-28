const express = require("express");
const { ctrlWrapper, registerValidation, auth } = require("../../middlewares");
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

module.exports = router;
