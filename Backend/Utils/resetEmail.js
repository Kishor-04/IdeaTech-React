const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (email, resetLink) => {
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
        subject: 'Reset Your Password',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Hello,
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            We received a request to reset your password. Click the button below to reset your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; font-size: 16px; border-radius: 5px; display: inline-block;">Reset My Password</a>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            If the button above doesn't work, you can copy and paste the following link into your web browser:
          </p>
          <p style="font-size: 14px; line-height: 1.5; color: #555; word-break: break-word;">
            <a href="${resetLink}" style="color: #4CAF50;">${resetLink}</a>
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
            Thank you,<br/>The Team
          </p>
        </div>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
