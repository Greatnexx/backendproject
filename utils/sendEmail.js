import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendWelcomeEmail = async (user) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false 
            }
        });
        

        const templatePath = path.join(__dirname, '../views/welcomeEmail.ejs');

        const html = await ejs.renderFile(templatePath, { name: user.username }); 

        
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Welcome to Our Service',
            html: html, 
        };

        
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${user.email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

export default sendWelcomeEmail;
