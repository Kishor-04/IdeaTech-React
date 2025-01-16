const StudentModel = require("../Models/Student");

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the student by the token
        const student = await StudentModel.findOne({ verificationToken: token });

        if (!student) {
            // Check if the email might already be verified
            const verifiedStudent = await StudentModel.findOne({ isVerified: true });
            if (verifiedStudent) {
                return res.status(200).json({
                    message: 'Email Already verified',
                    success: true
                });
            }
            return res.status(400).json({
                message: 'Invalid or expired verification token',
                success: false
            });
        }

        if (student.isVerified) {
            return res.status(200).json({
                message: 'Email already verified',
                success: true
            });
        }

        // Verify the student and clear the token
        student.isVerified = true;
        student.verificationToken = null;
        await student.save();

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
