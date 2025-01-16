const TeacherModel = require("../Models/Teacher");

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the teacher by the token
        const teacher = await TeacherModel.findOne({ verificationToken: token });

        if (!teacher) {
            // Check if the email might already be verified
            const verifiedTeacher = await TeacherModel.findOne({ isVerified: true });
            if (verifiedTeacher) {
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

        if (teacher.isVerified) {
            return res.status(200).json({
                message: 'Email Already Verified',
                success: true
            });
        }

        // Verify the teacher and clear the token
        teacher.isVerified = true;
        teacher.verificationToken = null;
        await teacher.save();

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
