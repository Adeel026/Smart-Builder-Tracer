const Appointment = require('../model/bookAppointment');
const sendInvitationEmail = require('../email/emailValidation').sendInvitationEmail;

const createAppointment = async (req, res) => {
  try {
    console.log("request Received ");
    const { name, email, phone, address, fees } = req.body;
    console.log(req.body);

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      address,
      fees,
    });

    console.log(newAppointment);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
    sendInvitationEmail(req, res);
    console.log("email sent succesfully")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createAppointment,
};
