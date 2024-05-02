const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    let token;

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "An error occurs" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "email not valid" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "password not valid" });
    }
    token = await user.generateAuthToken();
    // console.log("Token:", token);
    // console.log("User Details:", user);

    res.cookie('jwtoken', token, {
      expires: new Date(Date.now() + 25893000000),
      httpOnly: true
    });

    return res.json({ message: "sign in successful", token: token, user: user, email: email });
  } catch (error) {
    // console.log("Error Occurred while logging in", error);
    return res.json({ error: "Internal Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie('jwtoken', '', {
      expires: new Date(0),
      httpOnly: true
    });

    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error occurred while logging out", error);
    return res.json({ error: "Internal Server Error" });
  }
};


module.exports = {
  login, logout
};
