import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Paper, Box, Typography, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import { useNavigate } from 'react-router-dom';
import UserContext from '../Auth/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  box: {
    padding: theme.spacing(3),
  },
  input: {
    margin: theme.spacing(3, 0), // margin top and bottom
    marginBottom: theme.spacing(2),
  },
}));

const BlogForm = () => {
  const classes = useStyles();
  const { token } = useContext(UserContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [blog, setBlog] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const blogSave = async (event) => {
    event.preventDefault();

    if (!title || !subtitle || !blog || !category) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('category', category);
    formData.append('blog', blog);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Blogger`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        console.log('Response:', response.data);
        navigate('/home-page');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        console.error('Network error:', error.message);
      } else {
        console.error('Error:', error.message);
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
      <DrawerComponent
        left={drawerOpen}
        toggleDrawerHandler={toggleDrawer(false)}
      />
      <ToolbarComponent openDrawerHandler={toggleDrawer(true)} />
      <Container maxWidth="md" className={classes.root}>
        <Paper component={Box} elevation={20} className={classes.box}>
          <Typography variant='h4' margin={2}>Write Blog</Typography>
          <Box component='form' mt={2} onSubmit={blogSave}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  fullWidth
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={'Engineer'}>Engineer</MenuItem>
                  <MenuItem value={'Farmer'}>Farmer</MenuItem>
                  <MenuItem value={'Investor'}>Investor</MenuItem>
                  <MenuItem value={'Banker'}>Banker</MenuItem>
                  <MenuItem value={'Carpenter'}>Carpenter</MenuItem>
                  <MenuItem value={'Science'}>Science</MenuItem>
                  <MenuItem value={'Researcher'}>Researcher</MenuItem>
                  <MenuItem value={'Home Science'}>Home Science</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  placeholder='Title'
                  label='Title'
                  name='title'
                  variant='outlined'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={classes.input}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder='Subtitle'
                  label='Subtitle'
                  variant='outlined'
                  className={classes.input}
                  name='subtitle'
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder='Blog'
                  variant='outlined'
                  label='Blog'
                  name='blog'
                  multiline
                  rows={5}
                  className={classes.input}
                  value={blog}
                  onChange={(e) => setBlog(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={classes.input}
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.input}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default BlogForm;
