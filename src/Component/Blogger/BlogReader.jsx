import React, { useEffect, useState ,useContext} from 'react';
import {
  Container, Grid, Paper, CardHeader, Avatar, TextField, CardActionArea, CardMedia, CardContent, Typography, makeStyles
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import DrawerComponent from "../Drawer/Drawer";
import axios from 'axios';
import ToolbarComponent from "../Toolbar/Toolbar";
import UserContext from '../Auth/UserContext';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  media: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3), // Add margin bottom to separate the sections
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

function ResponsiveCard() {
  const location = useLocation();
  const classes = useStyles();
  const [detaildata, setDetailData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [text, setText] = useState('');
  const { token } = useContext(UserContext);

  const detopldata = {
    title: 'John Doe',
    DateTime: 'July 17, 2024',
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const id = new URLSearchParams(location.search).get('id');
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/bloger-creater-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setDetailData(result.data.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [location.search,token]);

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* First Section: Main Content */}
            <Paper elevation={15} className={classes.paper}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {detaildata.title ? detaildata.title[0] : ''}
                  </Avatar>
                }
                title={detaildata.title}
                subheader={detaildata.DateTime}
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${process.env.REACT_APP_BASE_URL}${detaildata.file}`}
                  className={classes.media}
                  alt="Photo"
                />
                <CardContent>
                  <Typography variant="h6">
                    {detaildata.blog}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Paper>

            {/* Second Section: User Input */}
            <Paper className={classes.paper}>
              <Typography variant="subtitle1" gutterBottom>
                Your text here
              </Typography>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {detopldata.title ? detopldata.title[0] : ''}
                  </Avatar>
                }
                title={detopldata.title}
                subheader={detopldata.DateTime}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Enter your text"
                placeholder="Type something here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ResponsiveCard;