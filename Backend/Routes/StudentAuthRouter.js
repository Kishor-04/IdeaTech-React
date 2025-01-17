const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/StudentAuthValidation');
const { signup, login } = require('../Controllers/StudentAuthController');
const { verifyEmail } = require('../Controllers/StudentVerificationController');
const { requestResetPassword, resetPassword } = require('../Controllers/StudentResetPasswordController');
const {validateRequestResetPassword,validateResetPassword} = require('../Middlewares/StudentForgotValidation');

const router = express.Router();

router.post('/login', loginValidation,login)

router.post('/signup', signupValidation, signup);

router.get('/student-verify-email/:token', verifyEmail);

router.post('/student-forgot-password', validateRequestResetPassword, requestResetPassword);
router.post('/student-reset-password/:token',validateResetPassword, resetPassword);

module.exports = router;