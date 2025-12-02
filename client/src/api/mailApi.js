import axios from "axios";

export const sendEmail = async ({ email, name, subject, html }) => {
  try {
    const res = await axios.post("/api/send-email", {
      email,
      name,
      subject,
      html,
    });
    return res.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        msg: "Failed to send email",
        error: error.message,
      }
    );
  }
};
