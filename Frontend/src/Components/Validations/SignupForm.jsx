import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Link } from 'react-router-dom';

const SignupForm = ({ title, experienceLabel, experiencePlaceholder, formtype }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    email: '',
    phone: '',
    password: '',
    experience: '',
    formtype: formtype,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registrationEndpoint =
      formtype === 'supervisor'
        ? 'http://localhost:8000/auth/register-supervisor'
        : 'http://localhost:8000/auth/register-customer';
  
    try {
      const response = await fetch(registrationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
      
        alert(`Registration successful as ${formtype}`);
      } else {
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
 
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 340,
    margin: '20px auto',
  };

  const avatarStyle = {
    backgroundColor: '#7b2317',
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <ConstructionIcon fontSize="medium" />
          </Avatar>
          <h2>{title}</h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            fullWidth
            variant="standard"
            required
          />

          <TextField
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            required
          />

          <TextField
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            fullWidth
            variant="standard"
            required
          />

          <TextField
            type="tel"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            fullWidth
            variant="standard"
            required
          />

        <TextField
            type="password"
            label="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            fullWidth
            variant="standard"
            required
          />

          <TextField
            label={experienceLabel}
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder={experiencePlaceholder}
            fullWidth
            variant="standard"
            required
          />

          <Button
            type="submit"
            className="font-serif block p-2 px-4 pt-2 text-white bg-red-950 rounded-full hover:bg-red-500 mt-2 md:p-2 md:px-2 md:pt-2 md:mt-6 text-center w-full"
          >
            {title}
          </Button>
        </form>

        <Link to="/login">
          <p className="hover:underline mt-4 mx-auto" style={{marginBlock:"auto"}}>
            Already a member? Sign in now!
          </p>
        </Link>
      </Paper>
    </Grid>
  );
};

export default SignupForm;

