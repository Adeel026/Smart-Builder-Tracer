const User = require("../model/userSchema");

const registerSupervisor = async (req, res) => {
  try {
    const { name, date, email, phone, password, experience, formtype } = req.body;

    console.log(req.body);

    if (!name || !email || !phone || !password) {
      return res.json({ error: "Please fill all the fields" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        error: "User already exists, please try with another email",
      });
    }

    const user = new User({ name, date, email, phone, password, experience, formtype });
    console.log(user);
    await user.save();
    return res.status(201).json({ message: "Supervisor registered successfully", email: email });
  } catch (error) {
    return res.status(500).json({ error: "Error occurred in supervisor registration" });
  }
};

const allSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ formtype: 'supervisor' }, '-password');
    return res.status(200).json({ supervisors });
  } catch (error) {
    return res.status(500).json({ error: 'Error occurred while fetching supervisors' });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { name, date, email, phone, password, formtype } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !password) {
      return res.json({ error: "Please fill all the fields" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        error: "User already exists, please try with another email",
      });
    }
    const user = new User({ name, date, email, phone, password, formtype });
    console.log(user)
    await user.save();

    return res.status(201).json({ message: "Customer registered successfully", email: email });
  } catch (error) {
    return res.status(500).json({ error: "Error occurred in customer registration" });
  }
};

module.exports = {
  registerSupervisor,
  registerCustomer,
  allSupervisors
};
