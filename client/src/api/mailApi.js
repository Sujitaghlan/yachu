    import axios from "axios";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const res = await axios.post("/api/send-email", { to, subject, html });
    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, msg: "Failed to send email" };
  }
};
