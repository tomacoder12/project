import nodemailer from 'nodemailer';
import { mailUserTemplate } from './template';
import dotenv from 'dotenv'
dotenv.config()

const transport = nodemailer.createTransport({
  host: "samena-c.com", 
  port: 587,           
  secure: false,         // Use true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_ADDRESS, 
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false 
  }
});

async function sendMail(receiver: string, subject: string, html: string) {
    const mailOptions = {
        from: {
            name: process.env.EMAIL_SENDER!,
            address: process.env.EMAIL_ADDRESS!,
        }, 
        to: receiver, 
        subject: subject,
        html: html,
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:---');
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export const mailUser = async (email: string, subject: string, message: {}) => {
    try {
        const html = mailUserTemplate(message);
        await sendMail(email, subject, html);
    } catch (error) {
        console.error("Error generating email template:", error);
        throw error;
    }
};
