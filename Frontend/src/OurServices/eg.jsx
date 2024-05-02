import React from 'react';
import { Grid,Paper,Avatar,TextField, Button  } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';


const Login = () => {

    const paperStyle = {
        padding:20,
        height:'70vh',
        width:280,
        margin:"20px auto",
    }
    const avatarStyle = {
        backgroundColor: "#7b2317",
    }
    const buttonStyle = 
    {
        border: "2px solid red",
        
    }
   
  return (
   <Grid>   
    <Paper elevation ={20} style={paperStyle}>
    <Grid align = 'center'>
    <Avatar style={avatarStyle}><ConstructionIcon fontSize='medium'/></Avatar>
    <h2>Sign in</h2>
    </Grid>
    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" /> */}
    <TextField type="email" label="Email" placeholder='Enter your email' fullWidth  variant="standard" required/>
    {/* <TextField label="Username" placeholder='Enter username' fullWidth  variant="standard" required/> */}
    <TextField type="password" label="Password" placeholder='Enter Password' fullWidth  variant="standard" required/>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'checkbox' }}
          />
        }
        label="Remember me"
      />
   <Button variant='contained' type='submit' color = 'primary'  fullWidth>
        Sign in
    </Button>
    </Paper>
    
   </Grid> 
  );
}

export default Login;
