const Appointment = require('../model/bookAppointment');
const nodemailer = require('nodemailer');

const sendInvitationEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user_email,
      pass: process.env.user_password,
    },
  });

  const { name, email, phone, address ,fees} = req.body;

  const fixedEmail = process.env.fixed_email

 const mailOptions = {
    from: process.env.user_email,
    to: [email,fixedEmail], 
    subject: "Book an Appoitment", 
    html: `
    <p> <strong> ${name} Successfully Booked an Appointment</p>
    <p>Details</>
    <div style="padding: 20px; font-size: 16px;">
      <p><strong>email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address</strong> ${address}</p>
      <p><strong>Fee</strong> ${fees}</p>

    </div>
  </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.json({ status: false, respMesg: 'Failed to send invitation email.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ status: true, respMesg: 'Invitation Email Sent Successfully' });
    }
  });
};

module.exports = {
  sendInvitationEmail,
};