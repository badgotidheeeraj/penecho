import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/Banner/Banner.png';

const defaultTheme = createTheme();

export default function SignUp() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [passwordMatch, setPasswordMatch] = React.useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      password: formData.get("password"),
    };

    if (!passwordMatch) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sign-up`, data);
      if (response.data.access && response.data.refresh) {
        setResponse('User created successfully');
        navigate("/");
      } else {
        setResponse(response.data.message || 'User creation failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        setResponse(
          error.response.data.message?.username ||
          error.response.data.message?.email ||
          'Server error'
        );
      } else if (error.request) {
        console.error('Network error:', error.message);
        setResponse('Network error');
      } else {
        console.error('Error:', error.message);
        setResponse('Error: ' + error.message);
      }
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
        }}
      >
        <CssBaseline />
        <Paper elevation={10} sx={{ padding: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {response && (
              <Typography color="error.main" sx={{ mt: 1 }}>
                {response}
              </Typography>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 500, height: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    value={password}
                    sx={{ bgcolor: 'background.paper' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    onChange={handleConfirmPasswordChange}
                    autoComplete="new-password"
                    value={confirmPassword}
                    sx={{ bgcolor: 'background.paper' }}
                  />
                  <Typography color={passwordMatch ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                    {passwordMatch ? "Passwords match" : "Passwords do not match"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions, and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!passwordMatch}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
