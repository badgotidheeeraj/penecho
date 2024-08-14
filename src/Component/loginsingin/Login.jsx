import React, { useState, useContext } from 'react';
import { Avatar, Button, TextField, CssBaseline, Typography, Box, Divider, FormControlLabel, Checkbox, Link, Grid, Paper, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import icon from '../../assets/icons/icon.png';
import banner from '../../assets/Banner/Banner.png';
import UserContext from '../Auth/UserContext';
import microsoftLogo from '../../assets/icons/microsoft-logo.png';
import { useMsal } from '@azure/msal-react';

const defaultTheme = createTheme();

export default function SignIn() {
    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const { instance } = useMsal();


    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    console.log(user)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataFront = new FormData(event.currentTarget);

        const data = {
            username: dataFront.get('email'),
            password: dataFront.get('password'),
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);
            if (response.data.access && response.data.refresh) {
                setToken(response.data.access);
                navigate('/home-page');
            }
        } catch (error) {
            const errorMessage = error.response
                ? 'Server error: ' + error.response.data.message
                : error.request
                    ? 'Network error: ' + error.message
                    : 'Error: ' + error.message;
            setError(errorMessage);
        }
    };


    const login = async () => {
        try {
            // Use loginPopup to obtain the token
            const loginResponse = await instance.loginPopup({
                scopes: ["User.Read"],
            });

            // Extract the access token directly
            const accessToken = loginResponse.accessToken;

            // Send the token to your backend for validation and JWT generation
            const response = await axios.post('http://localhost:8000/auth/azure/login/', {
                token: accessToken,
            });

            if (response.status === 200) {
                navigate('/home-page');
                setToken(response.data.access);
                console.log(response.data.access);
                // localStorage.setItem('access_token', response.data.access);
                // localStorage.setItem('refresh_token', response.data.refresh);
                // localStorage.setItem('refresh_token', response.data.refresh);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        try {
            await instance.logoutPopup();
            setIsAuthenticated(false);
            setUser({});
        } catch (err) {
            setError('Error during logout: ' + err.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth={false}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    p: 2,
                }}
            >
                <CssBaseline />
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={5} lg={4}>
                        <Paper elevation={15} sx={{ padding: 3, mt: 8 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <img src={icon} alt="icon" style={{ width: 200, height: 100, marginBottom: 10 }} />
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Username / Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    {error && (
                                        <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
                                            {error}
                                        </Typography>
                                    )}
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    <Divider sx={{ my: 2 }} />
                                    {isAuthenticated ? (
                                        <div>
                                            <Typography variant="body1" sx={{ mb: 2 }}>
                                                Welcome, {user.name}!
                                                Welcome, {user.email}!
                                                {/* Welcome, {user.pas}! */}
                                            </Typography>
                                            <Button variant="outlined" onClick={logout}>
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<img src={microsoftLogo} alt="Microsoft Logo" style={{ width: 24, height: 24 }} />}
                                            onClick={login}
                                            sx={{ mb: 2 }}
                                        >
                                        </Button>
                                    )}
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="/sign-up" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
