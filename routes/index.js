var express = require("express");
const { error } = require("jquery");
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// Route handler for submitting contact form
router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: `New message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending message.");
    }
    res.status(200).send("Message sent.");
  });
});

module.exports = router;
