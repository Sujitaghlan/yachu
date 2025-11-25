const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
const sendEmail = async (req, res) => {
  try {
    const { to, subject, message, html } = req.body;

    if (!to || !subject || (!message && !html)) {
      return res.status(400).json({
        success: false,
        msg: "Missing required fields (to, subject, message/html)",
      });
    }

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text: message,
      html: html,
    });

    res.json({ success: true, msg: "Email sent successfully!" });
  } catch (error) {
    console.log("Email Error => ", error);
    res.status(500).json({ success: false, msg: "Email sending failed" });
  }
};

module.exports = { sendEmail };