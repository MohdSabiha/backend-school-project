const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/newregistration",  (req, res) => {

    const { email , name, admission, father, mother, caste, dob, aadhar, reference} = req.body;
  try{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sabiha.devzen@gmail.com',
    pass: 'xliy anjs bynp alkm'
  }
});

var mailOptions = {
  from: 'sabiha.devzen@gmail.com',
  to: email,
  subject: 'You are Successfully Rergistered',
  text:`You got a new message from sabiha.devzen@gmail.com.\n
  Dear Student,\n
  Congratulations! You are successfully registered.\n
  Here are your details:\n\nEmail: ${email}\nName: ${name}\nAdmission No: ${admission}\nFather: ${father}\nMother: ${mother}\nCaste: ${caste}\nDate of Birth: ${dob}\nAadhar: ${aadhar}\nReference:${reference}`,
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  }catch (error) {
    console.log("Error" + error);
    res.status(401).json({status:401,error})
}
});
module.exports = router;