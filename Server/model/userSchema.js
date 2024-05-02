const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
 
  password: {
    type: String,
    required: true,
  },

  experience:{
    type:String
  },
  formtype:{
    type:String
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);

  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        user: {
          _id: this.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
        },
      }, // Store necessary user information
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("The generated token is ", token);
    return token;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
