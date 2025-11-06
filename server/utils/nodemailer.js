const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Yachu Hair Oil" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "OTP for Password Reset",
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
  });
};

module.exports = { sendOTPEmail };
