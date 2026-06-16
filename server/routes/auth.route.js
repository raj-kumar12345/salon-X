const express = require("express");
const { userRegisterController, userLoginController, verifyOTPController, currentUserController, forgetPasswordController, resetPasswordController } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();


router.post("/register",userRegisterController);
router.post("/verify-otp",verifyOTPController)
router.post("/login",userLoginController);
router.post("/forget-password",forgetPasswordController)
router.post("/reset-password",resetPasswordController)

router.get("/current-user",authMiddleware,currentUserController)


module.exports = router