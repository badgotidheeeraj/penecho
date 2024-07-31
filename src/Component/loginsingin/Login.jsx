import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import icon from '../../assets/icons/icon.png';
import banner from '../../assets/Banner/Banner.png';
import UserContext from '../Auth/UserContext';

const defaultTheme = createTheme();

export default function SignIn() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
        console.log('Response:', response.data);
        setToken(response.data.access);
        navigate('/profile');
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
                    required
                    fullWidth
                    id="email"
                    label="Username /Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
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
