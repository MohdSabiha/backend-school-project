const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const NewRegistrationModel = require("./models/newregistration");
const bodyParser = require("body-parser");
const router = require("./email/router");

const app = express();

app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(cors());
app.use(router)


mongoose.connect("mongodb+srv://nextjs:nextjs123@cluster0.wygvdvh.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Register your routes
 // Use the router for handling email

// Route to check if admission number exists
app.get('/checkadmission/:admission', (req, res) => {
  const { admission } = req.params;
  NewRegistrationModel.findOne({ admission: admission })
    .then(user => {
      if (user) {
        // Admission number already exists
        res.json({ exists: true });
      } else {
        // Admission number is unique
        res.json({ exists: false });
      }
    })
    .catch(err => {
      console.error("Error occurred during admission check:", err);
      res.status(500).json({ error: "An error occurred during admission check" });
    });
});

// Handle new registration submission
app.post('/newregistration', (req, res) => {
  // Ensure admission number uniqueness before creating new registration
  const { admission } = req.body;
  NewRegistrationModel.findOne({ admission: admission })
    .then(existingUser => {
      if (existingUser) {
        // Admission number already exists
        return res.status(400).json({ error: "Admission number already exists. Please choose a different one." });
      } else {
        // Admission number is unique, create new registration
        NewRegistrationModel.create(req.body)
          .then(newUser => res.json(newUser))
          .catch(err => res.status(500).json({ error: "Failed to create new registration" }));
      }
    })
    .catch(err => {
      console.error("Error occurred during new registration:", err);
      res.status(500).json({ error: "An error occurred during new registration" });
    });
});

app.get('/registrations', async (req, res) => {
  try {
    const registrations = await NewRegistrationModel.find();
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});


app.post('/register', (req,res) => {
  UserModel.create(req.body)
  .then(users => res.json(users))
  .catch(err  => res.json(err))
})

app.post('/login', (req,res) => {
  const {email, password} = req.body;
  UserModel.findOne({email : email})
  .then(users => {
    if(users) {
      if(users.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No record existed")
    }
  })
   .catch(err => res.status(500).json(err)); // Handle errors appropriately
})
app.post('/newregistration', (req,res) => {
  NewRegistrationModel.create(req.body)
  .then(users => res.json(users))
  .catch(err  => res.json(err))
})

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
