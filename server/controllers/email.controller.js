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
    const { email, name, subject, message, html } = req.body;

    if (!subject || (!message && !html)) {
      return res.status(400).json({
        success: false,
        msg: "Missing required fields (from, subject, message/html)",
      });
    }

    await transporter.sendMail({
      from: `"Enquiry from ${name}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject,
      text: message,
      replyTo: email,  
      html: html,
    });

    res.json({ success: true, msg: "Email sent successfully!" });
  } catch (error) {
    console.log("Email Error => ", error);
    res.status(500).json({ success: false, msg: "Email sending failed" });
  }
};

module.exports = { sendEmail };