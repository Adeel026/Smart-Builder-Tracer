const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },


  address:{
    type:String

  },
  fees:{
    type:Number
  }

});


const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
