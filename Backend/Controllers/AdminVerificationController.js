const AdminModel = require("../Models/Admin");

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the admin by the token
        const admin = await AdminModel.findOne({ verificationToken: token });

        if (!admin) {
            // Check if the email might already be verified
            const verifiedAdmin = await AdminModel.findOne({ isVerified: true });
            if (verifiedAdmin) {
                return res.status(200).json({
                    message: 'Email Already Verified',
                    success: true
                });
            }
            return res.status(400).json({
                message: 'Invalid or expired verification token',
                success: false
            });
        }

        if (admin.isVerified) {
            return res.status(200).json({
                message: 'Email Already Verified',
                success: true
            });
        }

        // Verify the admin and clear the token
        admin.isVerified = true;
        admin.verificationToken = null;
        await admin.save();

        res.status(200).json({
            message: 'Email verified successfully',
            success: true
        });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = { verifyEmail };
