// D:\My_Projects\My Real Projects\LoginSignup - Email-Auth\Backend\Controllers\ResetPasswordController.js
const crypto = require("crypto");
const AdminModel = require("../Models/Admin");
const { sendResetPasswordEmail } = require("../Utils/resetEmail");
const bcrypt = require("bcrypt");

// Step 1: Request Reset Password Link
const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found", success: false });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        admin.resetPasswordToken = resetToken;
        await admin.save();

        const resetLink = `${process.env.CLIENT_URL}/admin-reset-password/${resetToken}`;
        await sendResetPasswordEmail(email, resetLink);

        res.status(200).json({ message: "Password reset link sent to email", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


// Step 2: Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match", success: false });
        }

        const admin = await AdminModel.findOne({ resetPasswordToken: token });

        if (!admin) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        admin.password = await bcrypt.hash(password, 10);
        admin.resetPasswordToken = null; // Nullify the token after use
        await admin.save();

        res.status(200).json({ message: "Password reset successful", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


module.exports = { requestResetPassword, resetPassword };