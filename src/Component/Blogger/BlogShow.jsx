import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Auth/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, CardHeader, CardActionArea, Grid, CardMedia, Button, Card, CardActions, MenuItem, Select, Typography, CardContent, Avatar, Paper, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import { HeartFilled } from '@ant-design/icons';
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    media: {
        height: 200,
    },
    price: {
        color: theme.palette.success.main,
        fontWeight: 'bold',
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        marginTop: theme.spacing(1),
    },
    grider: {
        marginTop: "100px",
    },
}));

const CardComponent = () => {
    const { user, token } = useContext(UserContext);
    const classes = useStyles();
    const [photos, setPhotos] = useState([]);
    const [addCampaigns, setAddCampaigns] = useState([]);
    const [heart, setHeart] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [category, setCategory] = useState('');
    
    useEffect(() => {
    const fetchPhotos = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/show-blogger?search=${user}&category=${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPhotos(result.data.data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    

        fetchPhotos();
    }, [user, token, category]);

    useEffect(() => {
        const fetchAddCampaigns = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/add-campaign`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAddCampaigns(result.data.data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };
        fetchAddCampaigns()
    }, [token]);

    const formatDate = (dateString) => {
        return `${String(new Date(dateString).getDate()).padStart(2, '0')}-${String(new Date(dateString).getMonth() + 1).padStart(2, '0')}-${String(new Date(dateString).getFullYear()).slice(2)}`;
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
            <ToolbarComponent
                title={'dheeraj'}
                openDrawerHandler={toggleDrawer(true)}
            />
            <Grid container spacing={2} className={classes.root}>
                <Grid item lg={3} sm={3} md={3}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        fullWidth
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value='Engineer'>Engineer</MenuItem>
                        <MenuItem value='Farmer'>Farmer</MenuItem>
                        <MenuItem value='Investor'>Investor</MenuItem>
                        <MenuItem value='Banker'>Banker</MenuItem>
                        <MenuItem value='Carpenter'>Carpenter</MenuItem>
                        <MenuItem value='Science'>Science</MenuItem>
                        <MenuItem value='Researcher'>Researcher</MenuItem>
                        <MenuItem value='Home Science'>Home Science</MenuItem>
                    </Select>
                </Grid>
                <Grid item lg={6} sm={6} md={6}>
                    {photos.map((photo, index) => (
                        <Paper key={index} elevation={8} component={Box} square className={classes.paper}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        {photo.title[0]}
                                        {photo.subtitle[0]}
                                    </Avatar>
                                }
                                title={photo.title}
                                subheader={formatDate(photo.DateTime)}
                                action={
                                    <HeartFilled
                                        onClick={() => setHeart(!heart)}
                                        style={{ color: heart ? 'red' : '', background: 'none' }}
                                    />
                                }
                            />
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    src={photo.file}
                                    alt="Uploaded Image"
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography variant="h6">{photo.title.split(',')[0]}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {photo.tags}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {photo.blog.split('.')[0]}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    to={`/views-detail?id=${photo.id}`}
                                >
                                    View
                                </Button>
                            </CardActions>
                        </Paper>
                    ))}
                </Grid>
                <Grid item lg={3} sm={3} md={3}>
                    {addCampaigns.map((add, addkey) => (
                        <Card key={addkey} sx={{ maxWidth: 345 }} className={classes.grider}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={add.image}
                                    alt={add.title}
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {add.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {add.description}
                                    </Typography>
                                    <Typography variant="h6" className={classes.price}>
                                        ₹{add.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" component={Link} to={add.download_link} className={classes.link}>
                                    Go Touch With Us
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default CardComponent;
