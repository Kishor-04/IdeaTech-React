const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/TeacherAuthValidation');
const { verifyTeacherId, signup, login } = require('../Controllers/TeacherAuthController');
const { verifyEmail } = require('../Controllers/TeacherVerificationController');
const { requestResetPassword, resetPassword } = require('../Controllers/TeacherResetPasswordController');
const {validateRequestResetPassword,validateResetPassword} = require('../Middlewares/StudentForgotValidation');

const router = express.Router();

router.post('/verify-teacher-id', verifyTeacherId);
router.post('/login', loginValidation,login)
router.post('/signup', signupValidation, signup);

router.get('/teacher-verify-email/:token', verifyEmail);

router.post('/teacher-forgot-password',validateRequestResetPassword, requestResetPassword);
router.post('/teacher-reset-password/:token',validateResetPassword, resetPassword);

module.exports = router;