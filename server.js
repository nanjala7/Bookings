const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const sendBookingEmail = (to, bookingDetails) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject: 'Booking Confirmation',
    text: `Your booking is confirmed. Details: ${bookingDetails}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

app.post('/send-booking-email', (req, res) => {
  const { to, bookingDetails } = req.body;
  sendBookingEmail(to, bookingDetails);
  res.status(200).send('Email sent');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
