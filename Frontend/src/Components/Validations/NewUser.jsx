import React from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';
import "./NewUser.css"
import { Link, NavLink } from 'react-router-dom';


import Divider from '@mui/material/Divider';

const NewUser = () => {

    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 420,
        margin: "20px auto",
    }
    const avatarStyle = {
        backgroundColor: "#7b2317",
    }
    const buttonStyle =
    {
        border: "2px solid red",

    }


    return (
        <>
            <div className='mb-60'>
                <Divider type="true" />
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><ConstructionIcon fontSize='medium' /></Avatar>
                            <h2 className='text-2xl font-serif text-black mt-4 mb-24'>New? Join us now as a Supervisor or Customer!</h2>
                        </Grid>
                        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" /> */}

                        <NavLink to="/signup" className="font-serif block p-2 px-4 pt-2 text-white bg-red-950 rounded-full hover:bg-red-500 mt-2 md:p-2 md:px-2 md:pt-2 md:mt-6 text-center">
                            Sign up as a Supervisor
                        </NavLink>
                        <NavLink to="/signup-customer" className="font-serif block p-2 px-4 pt-2 text-white bg-red-950 rounded-full hover:bg-red-500 mt-2 md:p-2 md:px-2 md:pt-2 md:mt-6 text-center">
                            Sign up as a Customer?
                        </NavLink>

                    </Paper>

                </Grid>
            </div>
        </>
    );
}

export default NewUser;
