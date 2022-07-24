import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import {List} from "@mui/icons-material";
import './styles.css';
import {Link } from 'react-router-dom';

class Appbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menu: false};
    }
    showMenu = false;

    toggle() {
        this.setState({menu: !this.state.menu})
    }

    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [anchor]: open });
    };

    render() {
        return <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <React.Fragment key={this.state.menu}>
                            <MenuIcon onClick={this.toggle.bind(this)}/>
                            <Drawer
                                anchor="left"
                                open={this.state.menu}
                                onClose={this.toggle.bind(this)}
                            >
                                <Link to={`/`} className={"clean-href-eff-btn"}>
                                    <MenuItem>Main</MenuItem>
                                </Link>
                                <Link to={`/dashboard`} className={"clean-href-eff-btn"}>
                                    <MenuItem>Dashboard</MenuItem>
                                </Link>
                                <Link to={`/login`} className={"clean-href-eff-btn"}>
                                    <MenuItem>Login</MenuItem>
                                </Link>
                            </Drawer>
                        </React.Fragment>

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        F.S.
                    </Typography>
                    <Link to={`/login`} className={"clean-href-eff-btn"}>
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    }
}

export default Appbar;
