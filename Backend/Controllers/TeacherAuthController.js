const express = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require("../Utils/verifyEmail");
const crypto = require("crypto");

const TeacherModel = require("../Models/Teacher")
const TeacherIdModel = require("../Models/Teacher_Id");

const app = express();

app.use(express.json());


// Verify Teacher ID
const verifyTeacherId = async (req, res) => {
    try {
        const { teacher_id } = req.body;
        console.log(teacher_id);

        const teacherIdRecord = await TeacherIdModel.findOne({ teacher_id });
        if (!teacherIdRecord) {
            return res.status(404).json({
                message: 'Invalid Teacher ID',
                success: false
            });
        }

        if (teacherIdRecord.id_verified) {
            return res.status(403).json({
                message: 'This Teacher ID has already been used for signup',
                success: false
            });
        }

        // Generate a temporary token with the teacher_id
        const tempToken = jwt.sign(
            { teacher_id },
            process.env.JWT_SECRET,
            { expiresIn: '10m' } // Token valid for 10 minutes
        );

        res.status(200).json({
            message: 'Teacher ID verified successfully. Proceed to signup.',
            success: true,
            tempToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;  // Removed tempToken from the body

        // Check if Authorization token is present
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403)
                .json({ message: 'Unauthorized, JWT token is required' });
        }
        // Verify the JWT token
        let teacher_id;
        try {
            const decoded = jwt.verify(auth, process.env.JWT_SECRET);
            teacher_id = decoded.teacher_id;
        } catch (error) {
            return res.status(403)
                .json({ message: 'Unauthorized, JWT token is wrong or expired' });
        }
        // Check if the teacher already exists in the database
        const existingTeacher = await TeacherModel.findOne({ email });
        if (existingTeacher) {
            return res.status(409).json({
                message: 'Teacher already exists. You cannot signup again.',
                success: false
            });
        }
        // Check if the teacher_id exists and is not verified in TeacherIdModel
        const teacherIdRecord = await TeacherIdModel.findOne({ teacher_id });
        if (!teacherIdRecord || teacherIdRecord.id_verified) {
            return res.status(403).json({
                message: 'Invalid or already used Teacher ID.',
                success: false
            });
        }
        // Create a new teacher account
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const newTeacher = new TeacherModel({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            verificationToken
        });

        await newTeacher.save();

        // Mark teacher_id as verified in TeacherIdModel
        teacherIdRecord.id_verified = true;
        await teacherIdRecord.save();
        // Send a verification email to the teacher
        const verificationLink = `${process.env.CLIENT_URL}/teacher-verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({
            message: 'Signup successful. Please verify your email.',
            success: true
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const Teacher = await TeacherModel.findOne({ email });

        if (!Teacher) {
            return res.status(403)
                .json({ message: "Teacher Not Found", sucess: false });
        }

        if (!Teacher.isVerified) {
            const verificationLink = `${process.env.CLIENT_URL}/teacher-verify-email/${Teacher.verificationToken}`;
            await sendVerificationEmail(email, verificationLink);
            return res.status(203)
                .json({ message: 'Please verify your email. Verification link sent.', success: false });
        }

        const isPassEqual = await bcrypt.compare(password, Teacher.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "Password is Incorrect", sucess: false });
        }

        const jwtToken = jwt.sign(
            { email: Teacher.email, _id: Teacher._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: 'Login successful',
                success: true,
                jwtToken,
                email,
                name:Teacher.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            })
    }
}

module.exports = {
    signup,
    login,
    verifyTeacherId
}
