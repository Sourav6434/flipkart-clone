//const HTML_TEMPLATE = require('./mail-template');
// Import nodemailer library

const dotenv = require('dotenv')
dotenv.config()

const nodemailer = require('nodemailer');

// Create transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Define function to send email
const sendEmail = async (req, res) => {
  try {
    const { name, email, data } = req.body;


    // Mail options
    const mailOptions = {
      from: {
        name: 'Flipkart Offers',
        address: 'souravmallick6434@gmail.com'
      },
      to: [email],
      subject: 'Latest Offers for you',
      html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>NodeMailer Email Template</title>
                <style>
                .container {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #f4f4f4;
  }

  .email {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px; /* Added border radius */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Added box shadow */
  }

  .email-header {
    background-color: #5e8fc5;
    color: #fff;
    padding: 20px;
    text-align: center;
    border-top-left-radius: 10px; /* Added border radius */
    border-top-right-radius: 10px; /* Added border radius */
  }

  .email-body {
    padding: 20px;
  }

  .email-footer {
    background-color: #cfcc1b;
    color: #000000;
    padding: 20px;
    text-align: center;
    border-bottom-left-radius: 10px; 
    border-bottom-right-radius: 10px; 
  }

  .offer-box {
    width: 30%;
    padding: 20px;
    margin: 20px;
    border: 5px solid #5eaed3;
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }
</style>

              </head>
              <body>
                <div class="container">
                  <div class="email">
                    <div class="email-header">
                      <h1>Hureyyyyyyy!! Grab the deal!!  <i>${name}</i></h1>
                    </div>
                    <div class="email-body">
                    <div className="offer-box">
                    <h3>${data.OfferTitle}!!</h3>
                    <p><strong>Description:</strong> ${data.OfferDescription}</p>
                    <p><strong>Discount:</strong> ${data.Discount}%</p>
                    <p><strong>Start Date:</strong> ${data.StartDate}</p>
                    <p><strong>End Date:</strong> ${data.EndDate}</p>
                    <p><strong>Coupon Code:</strong> ${data.CouponCode}</p>
                    <p><strong>Availability:</strong> ${data.Availability}</p>
                    <p><strong>Redemption Method:</strong> ${data.RedemptionMethod}</p>
                    
                </div>
                    </div>
                    <div class="email-footer">
                      <p>Flipkart.com  copyright 2024</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `

    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent!');

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};





// Export the function so it can be used in other files
module.exports = {
  sendEmail
};





