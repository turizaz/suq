import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import AppBar from "./components/common/appbar/appbar";
import React from "react";
import Login from "./components/login/login";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Register from "./components/register/register";
import { purple, red, green, indigo } from '@mui/material/colors';
import Asset from "./components/asset/asset";
function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                // light: will be calculated from palette.primary.main,
                main: purple[500],
                light: purple[100],
                dark: purple[900],
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: indigo[300],
            },
            info: {
                main: indigo[300],
            }
        },
    });

  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
          <AppBar/>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="asset" element={<Asset />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
