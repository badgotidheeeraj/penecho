import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';
import UserContext from '../Auth/UserContext';
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import axios from 'axios';

const ProductForm = () => {
  const { token } = useContext(UserContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    download_link: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        tempErrors[field] = 'This field is required.';
      }
    });
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/add-createPost`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data);
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <DrawerComponent left={drawerOpen} toggleDrawerHandler={toggleDrawer(false)} />
      <ToolbarComponent title={'dheeraj'} openDrawerHandler={toggleDrawer(true)} setSearch />

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
