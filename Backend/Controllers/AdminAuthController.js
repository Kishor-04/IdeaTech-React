const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require("../Utils/verifyEmail");
const crypto = require("crypto");

const AdminModel = require("../Models/Admin")

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const Admin = await AdminModel.findOne({ email });
        console.log(Admin);
        
        if (Admin) {
            return res.status(409)
                .json({ message: 'Admin is already exist,you cannot login', sucess: false })
        }
        
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const adminModel = new AdminModel({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            verificationToken
        });

        await adminModel.save();
        const verificationLink = `${process.env.CLIENT_URL}/admin-verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201)
            .json({
                message: 'Signup successfuly, please verify your email',
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
        const Admin = await AdminModel.findOne({ email });

        if (!Admin) {
            return res.status(403)
                .json({ message: "Admin Not Found", sucess: false });
        }

        if (!Admin.isVerified) {
            const verificationLink = `${process.env.CLIENT_URL}/admin-verify-email/${Admin.verificationToken}`;
            await sendVerificationEmail(email, verificationLink);
            return res.status(203)
                .json({ message: 'Please verify your email. Verification link sent.', success: false });
        }

        const isPassEqual = await bcrypt.compare(password, Admin.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "Password is Incorrect", sucess: false });
        }

        const jwtToken = jwt.sign(
            { email: Admin.email, _id: Admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: 'Login successful',
                success: true,
                jwtToken,
                email,
                name:Admin.name
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

