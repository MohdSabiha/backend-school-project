const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    imagePreview: {
    type: String,
    required: true
   },
    admission: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    father: {
        type: String,
        required: true
    },
    mother: {
        type: String,
        required: true
    },
    caste: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Ensure mobile number is exactly 10 digits
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    dob: {
        type: Date,
        required: true
    },
    aadhar: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{12}$/.test(v); // Ensure Aadhar number is exactly 12 digits
            },
            message: props => `${props.value} is not a valid Aadhar number!`
        }
    },
    reference: {
        type: String
    }
})

const NewRegistrationModel = mongoose.model("registers", UserSchema)
module.exports= NewRegistrationModel