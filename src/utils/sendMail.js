import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('SMTP VERIFY ERROR:', error);
  } else {
    console.log('SMTP server is ready');
  }
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('MAIL SENT:', info);
    return info;
  } catch (error) {
    console.error('NODEMAILER ERROR:', error);
    throw error;
  }
};
