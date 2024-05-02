import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 340,
    margin: "20px auto",
  };

  const avatarStyle = {
    backgroundColor: "#7b2317",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, rememberMe } = formData;
      console.log(formData);

      const response = await fetch("http://localhost:8000/auth/login-user", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      // console.log(data.token);
      localStorage.setItem('token', data.token);
      if(data.user.formtype === 'customer'){
      navigate("/customer")
      } else {
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/supervisor")
      }
      // window.alert("Sign in successful!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <ConstructionIcon fontSize="medium" />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            placeholder="Enter your email"
            fullWidth
            variant="standard"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Enter Password"
            fullWidth
            variant="standard"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "checkbox" }}
            checked={formData.rememberMe}
            onChange={handleCheckboxChange}
          />
          <span>Remember me</span>
          <Button
            className="font-serif block p-2 px-4 pt-2 text-white bg-red-950 rounded-full hover:bg-red-500 mt-2 md:p-2 md:px-2 md:pt-2 md:mt-6 text-center w-full"
            type="submit"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Sign in
          </Button>
        </form>
        <Link to="/newuser">
          <p className="hover:underline mt-4 mx-auto">
            Not a member? Sign up now!
          </p>
        </Link>
      </Paper>
    </Grid>
  );
};

export default Login;
