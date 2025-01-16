const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationLink) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome! Verify Your Email to Get Started',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">Welcome to Our Platform!</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Hello, and thank you for signing up! We're excited to have you on board.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            To complete your registration, please confirm your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationLink}" style="text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; font-size: 16px; border-radius: 5px; display: inline-block;">Verify My Email</a>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            If the button above doesn't work, you can copy and paste the following link into your web browser:
          </p>
          <p style="font-size: 14px; line-height: 1.5; color: #555; word-break: break-word;">
            <a href="${verificationLink}" style="color: #4CAF50;">${verificationLink}</a>
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            If you didn’t sign up for an account, you can safely ignore this email.
          </p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
            Thank you,<br/>The Team
          </p>
        </div>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
