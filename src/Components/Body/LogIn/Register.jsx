import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext} from "react";
import {GeneralContext} from "../../GeneralContext.jsx";

function Copyright(props) {
    return (
        <Typography variant="body2" color="#0F0A0A" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        text:{
            main: 'rgba(0, 0, 0, 0.23)',
        },
        primary: {
            light: '#0F0A0A',
            main: '#0F0A0A',
            dark: '#0F0A0A',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },

    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
});



export default function SignUpSide() {
    const {createUserPost} = useContext(GeneralContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dat1= {
            email: data.get('email'),
            password: data.get('password'),
            lastName: data.get('lastName'),
            name: data.get('name'),
            phone: data.get('phone')
        }
        console.log(dat1)
        createUserPost(dat1)
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-suits/subhome-xmedia-13//w/988/IMAGE-portrait-ipad-fill-f3b9cfcc-a5af-4ac1-8cde-a6543e771b3e-default_0.jpg?ts=1679911701987)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.primary[50] : t.palette.primary[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid sx={{
                    backgroundColor:"white"
                }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',    
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography color='black' component="h1" variant="h5">
                            Register  
                        </Typography>
                        <Box color='primary' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                color='primary'
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                color='primary'
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                color='primary'
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Nombres"
                                type="name"
                                id="name"
                                autoComplete="current-password"
                            />
                            <TextField
                                color='primary'
                                margin="normal"
                                required
                                fullWidth
                                name="lastName"
                                label="Apellidos"
                                type="lastName"
                                id="lastName"
                                autoComplete="current-password"
                            />
                            <TextField
                                color='primary'
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Telefono (10 digitos)"
                                type="phone"
                                id="phone"
                                autoComplete="current-password"
                            />
                            <Button
                                color="secondary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >      
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        "Don't have an account? Sign Up"
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}