import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
//import './styles.css';


class Login extends React.Component {
    state = {
        data: {email: '', password: ''},
        loading: false,
        backendErrors: [],
        errors: {email: null, password: null},
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("SUBMIT")
        console.log(e);
    }

    onChange = (e: any) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({data: {...this.state.data, [e.target.name]: e.target.value}})
    }

    render() {
        const {data} = this.state;
        return <Container component="main" maxWidth="xs">
            <title>Login</title>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
                <LoginSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit.bind(this)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="login"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href={"/register"} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>;

        // return <Grid container component="main" sx={{ height: '100vh' }}>
        //     <title>LOGIN</title>
        //     <CssBaseline />
        //     <Grid
        //         item
        //         xs={false}
        //         sm={4}
        //         md={7}
        //         sx={{
        //             backgroundImage: 'url(https://source.unsplash.com/random)',
        //             backgroundRepeat: 'no-repeat',
        //             backgroundColor: (t) =>
        //                 t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //             backgroundSize: 'cover',
        //             backgroundPosition: 'center',
        //         }}
        //     />
        //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        //         <Box
        //             sx={{
        //                 my: 8,
        //                 mx: 4,
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        //                 <LockOutlinedIcon />
        //             </Avatar>
        //             <Typography component="h1" variant="h5">
        //                 Sign in
        //             </Typography>
        //             <Box component="form" noValidate onSubmit={this.handleSubmit.bind(this)} sx={{ mt: 1 }}>
        //                 <TextField
        //                     margin="normal"
        //                     required
        //                     value={data.email}
        //                     onChange={this.onChange}
        //                     fullWidth
        //                     id="email"
        //                     label="Email Address"
        //                     name="email"
        //                     autoComplete="email"
        //                     autoFocus
        //                 />
        //                 <TextField
        //                     margin="normal"
        //                     required
        //                     fullWidth
        //                     onChange={this.onChange}
        //                     value={data.password}
        //                     name="password"
        //                     label="Password"
        //                     type="password"
        //                     id="password"
        //                     autoComplete="current-password"
        //                 />
        //                 <FormControlLabel
        //                     control={<Checkbox value="remember" color="primary" />}
        //                     label="Remember me"
        //                 />
        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     sx={{ mt: 3, mb: 2 }}
        //                 >
        //                     Sign In
        //                 </Button>
        //                 <Grid container>
        //                     <Grid item xs>
        //                         <Link to={`/`} variant="body2">
        //                             Forgot password?
        //                         </Link>
        //                     </Grid>
        //                     <Grid item>
        //                         <Link to={`/register`} variant="body2">Don't have an account? Sign Up</Link>
        //                     </Grid>
        //                 </Grid>
        //             </Box>
        //         </Box>
        //     </Grid>
        // </Grid>
    }
}

export default Login;
