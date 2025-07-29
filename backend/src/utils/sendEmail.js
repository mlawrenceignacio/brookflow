import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const emailOptions = {
      from: `BrookFlow <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(emailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};
