const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/AdminAuthValidation');
const { signup, login } = require('../Controllers/AdminAuthController');
const { verifyEmail } = require('../Controllers/AdminVerificationController');
const { requestResetPassword, resetPassword } = require('../Controllers/AdminResetPasswordController');
const {validateRequestResetPassword,validateResetPassword} = require('../Middlewares/StudentForgotValidation');

const router = express.Router();

router.post('/login', loginValidation,login)

router.post('/signup', signupValidation, signup);

router.get('/admin-verify-email/:token', verifyEmail);

router.post('/admin-forgot-password',validateRequestResetPassword, requestResetPassword);
router.post('/admin-reset-password/:token',validateResetPassword, resetPassword);

module.exports = router;