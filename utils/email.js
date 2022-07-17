const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //  Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'nsonguruajohnson@gmail.com',
        to: 'nsonguruajohnson@gmail.com',
        subject: options.subject,
        text: options.message,
        // html: 
    }

    // Actually send the email
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;