const Joi = require("joi");

// Middleware for validating "Request Reset Password" inputs
const validateRequestResetPassword = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .pattern(/@kkwagh\.edu\.in$/)
            .required()
            .messages({
                "string.empty": "Email is required.",
                "string.email": "Invalid email format.",
                "string.pattern.base": "Email must end with '@kkwagh.edu.in'.",
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(' ');
        return res.status(400).json({
            message: errorMessages,
            success: false,
        });
    }
    next();
};

// Middleware for validating "Reset Password" inputs
const validateResetPassword = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
            .required()
            .messages({
                "string.empty": "Password is required.",
                "string.min": "Password must be at least 8 characters long.",
                "string.pattern.base": "Password must contain at least one special character and one number.",
            }),
        confirmPassword: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                "any.only": "Passwords do not match.",
                "any.required": "Confirm Password is required.",
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => err.message).join(' ');
        return res.status(400).json({
            message: errorMessages,
            success: false,
        });
    }
    next();
};

module.exports = {
    validateRequestResetPassword,
    validateResetPassword,
};