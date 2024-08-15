import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Box, Typography, Paper, Grid, Card, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Auth/UserContext';
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import PostAddIcon from '@mui/icons-material/PostAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const ProductForm = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    download_link: '',
    image: null,
  });
  const [moneyPaisaDollar, setMoneyPaisaDollar] = useState([]);

// console.log(moneyPaisaDollar[0].TranctionsAmount);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    Object.keys(formData).forEach((field) => {
      if (field !== 'image' && !formData[field]) {
        tempErrors[field] = 'This field is required.';
      }
    });

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/digitalmarketpost/`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data);
        navigate('/home-page');
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };


  React.useEffect(() => {
    const fetchAddCampaigns = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/priceforadd/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMoneyPaisaDollar(result.data.data);

        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };
    fetchAddCampaigns()
}, [token]);


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <DrawerComponent left={drawerOpen} toggleDrawerHandler={toggleDrawer(false)} />
      <ToolbarComponent title={'dheeraj'} moneyTransfer={moneyPaisaDollar} openDrawerHandler={toggleDrawer(true)} setSearch />

      <Grid container spacing={3} marginTop={1}>
        {/* Money Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={12}>
            <Card sx={{ minWidth: 275, backgroundColor: '#e0f7fa' }}>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                  Total Money
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                 
                ₹:<span style={{color:"green"}}>{moneyPaisaDollar.map((key, index) => (key.TotalPrice))}</span>
                  <AccountBalanceWalletIcon sx={{ fontSize: 40, marginLeft: 2 }} />
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Current Balance
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">View Transactions</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Posts Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={12}>
            <Card sx={{ minWidth: 275, backgroundColor: '#f3e5f5' }}>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                  Total Posts
                </Typography>
                <Typography variant="h4" component="div" color="secondary">
                  456
                  <PostAddIcon sx={{ fontSize: 40, marginLeft: 2 }} />
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Posts Created
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary">Manage Posts</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Other Metric Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={12}>
            <Card sx={{ minWidth: 275, backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                  Performance
                </Typography>
                <Typography variant="h4" component="div" color="text.primary">
                  89%
                  <TrendingUpIcon sx={{ fontSize: 40, marginLeft: 2 }} />
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Growth Rate
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      <Container maxWidth="sm">
        <Box component={Paper} elevation={10} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Product Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Download Link"
              name="download_link"
              value={formData.download_link}
              onChange={handleChange}
              error={!!errors.download_link}
              helperText={errors.download_link}
            />
            <TextField
              fullWidth
              margin="normal"
              type="file"
              name="image"
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProductForm;
