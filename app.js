//Using node.js & express server

//In the future, consider breaking this logic up into several files. However, this isn't a 
//priority at the moment since this is a small file with a limited number of routes.

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client', {
  cacheControl: true, setHeaders: function(res, path){
    res.setHeader("cache-control", "public, max-age=600");

  }
}));

app.get('/welcome', (req, res) => {
  res.sendFile('/client/welcome.html', { root: __dirname });
});

app.get(['/', '/aboutMe'], (req, res) => {
  res.sendFile('/client/aboutMe.html', { root: __dirname });
})

app.post('/contact', (req, res) => {
  let contactInfo = {};
 
  //Make sure all required fields on the form were included in the request
  if(!req.body.fullName || !req.body.email || !req.body.message) { 
    res.sendStatus(400).send({ error: 'Required fields on form were missing in request'})
  }

  else {

    contactInfo.name = req.body.fullName;
    contactInfo.emailAddress = req.body.email;
    contactInfo.message = req.body.message;
    contactInfo.company = req.body.company || 'Not provided';
    contactInfo.phone = req.body.phone || 'Not provided';

    sendEmail(contactInfo)
    .then(emailData => {
      console.log(emailData);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

const sendEmail = async email => {

    const emailBody = `Name: ${email.name} \n Company: ${email.company} \n Phone: ${email.phone}
                       Email: ${email.emailAddress} \n Message: ${email.message} \n
                      `;
    const emailSubject = email.message.slice(0,70);

    let transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      service: 'yahoo',
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SOURCE_EMAIL,
        pass: process.env.SECRET_KEY,
      },
    });

    let sentResponse = await transporter.sendMail({
      from: `"Eric" <${process.env.SOURCE_EMAIL}>`,
      to: process.env.DESTINATION_EMAIL,
      subject: emailSubject,
      text: emailBody
    });

    return sentResponse;

}
