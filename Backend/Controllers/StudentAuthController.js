const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require("../Utils/verifyEmail");
const crypto = require("crypto");

const StudentModel = require("../Models/Student")

const signup = async (req, res) => {
    try {
        const { name, email, password,confirmPassword } = req.body;

        if(password !== confirmPassword){
            return res.status(409)
                .json({ message: 'Password does not match', sucess: false })
        }
        
        const Student = await StudentModel.findOne({ email });
        console.log(Student);
        
        if (Student) {
            return res.status(409)
                .json({ message: 'Student is already exist,you cannot login', sucess: false })
        }

        

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const studentModel = new StudentModel({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            verificationToken
        });

        await studentModel.save();

        const verificationLink = `${process.env.CLIENT_URL}/student-verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201)
            .json({
                message: 'Signup successfull, please verify your email',
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const Student = await StudentModel.findOne({ email });

        if (!Student) {
            return res.status(403)
                .json({ message: "Student Not Found", sucess: false });
        }

        if (!Student.isVerified) {
            const verificationLink = `${process.env.CLIENT_URL}/student-verify-email/${Student.verificationToken}`;
            await sendVerificationEmail(email, verificationLink);
            return res.status(203)
                .json({ message: 'Please verify your email. Verification link sent.', success: false });
        }

        const isPassEqual = await bcrypt.compare(password, Student.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "Password is Incorrect", sucess: false });
        }

        const jwtToken = jwt.sign(
            { email: Student.email, _id: Student._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: 'Login successful',
                success: true,
                jwtToken,
                email,
                name:Student.name
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
    login
}
