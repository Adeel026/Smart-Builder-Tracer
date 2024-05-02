import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    CssBaseline,
    Drawer,
    Typography
} from "@material-ui/core";
import {
    Menu,
} from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menuSliderContainer: {
        width: 250,
        background: "rgba(69, 10, 10);",
        height: "100%"
    },
    avatar: {
        margin: "0.5rem auto",
        padding: "1rem",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    listItem: {
        color: "white"
    }
}));



export default function SideBar({ listItems }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSlider = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout-user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                localStorage.getItem('user') != null && localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/');

            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const sideList = () => (
        <Box className={classes.menuSliderContainer} component="div">
            <Avatar
                className={classes.avatar}
                src="https://i.ibb.co/rx5DFbs/avatar.png"
                alt=""
            />
            <Divider />
            <List>
                {listItems.map((listItem, index) => (
                    <Link to={listItem.path} key={index}>
                        <ListItem className={classes.listItem} key={index}>
                            <ListItemIcon className={classes.listItem}>
                                {listItem.listIcon}
                            </ListItemIcon>
                            <ListItemText primary={listItem.listText} />
                        </ListItem>
                    </Link>
                ))}
                <Link onClick={handleLogout}>
                    <ListItem
                        className={classes.listItem}>
                        <ListItemIcon className={classes.listItem}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <>
            <CssBaseline />
            <Box component="nav">
                <AppBar position="static" style={{ background: "rgb(77, 77, 77)" }}>
                    <Toolbar >
                        <IconButton onClick={toggleSlider}>
                            <Menu />
                        </IconButton>
                        <Typography>Smart Builder</Typography>
                        <Drawer open={open} anchor="right" onClose={toggleSlider}>
                            {sideList()}
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
