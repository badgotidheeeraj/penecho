import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Auth/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardHeader, CardActionArea, CardMedia, Paper, Grid, TextField, Button, Box, Card, CardActions, MenuItem, Select, Typography, CardContent, Avatar, InputLabel
} from '@material-ui/core';
import axios from 'axios';
import { HeartFilled } from '@ant-design/icons';
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import { Link } from 'react-router-dom';
import ask from '../../assets/icons/ask.png';
import ads from '../../assets/icons/ads.png';

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
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');


    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            setQuestions([...questions, { question: newQuestion, answer: 'This is an answer placeholder.' }]);
            setNewQuestion('');
        }
    };

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Blogger?search=${user}&category=${category}`, {
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
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/digitalmarketpost/`, {
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
                    <Paper elevation={8} component={Box} square className={classes.paper} >

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

                        <Typography subheader={'h1'}>About</Typography>
                        <Typography subheader={'h1'}>Contact</Typography>
                        <Typography subheader={'h1'}>service</Typography>
                    </Paper>
                </Grid>
                <Grid item lg={6} sm={6} md={6}>

                    <Paper
                        elevation={3}
                        sx={{

                            marginBottom: 3,
                            backgroundColor: '#f7f7f7',
                            borderRadius: 4,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', // Subtle shadow for depth
                        }}
                    >
                        <Box margin={0.5}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <TextField
                                        label="Your Question"
                                        variant="outlined"
                                        fullWidth
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        // color="primary"
                                        onClick={handleAddQuestion}
                                        startIcon={<img src={ask} alt="Ask Logo" style={{ width: 36, height: 45 }} />}
                                        sx={{ fontWeight: 'bold', marginTop: 1 }}
                                    >
                                        Ask
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to="/post" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            // color="primary"
                                            startIcon={<img src={ads} alt="Adds Logo" style={{ width: 36, height: 45 }} />}
                                            sx={{ fontWeight: 'bold', marginTop: 1 }}
                                        > Adds
                                        </Button>
                                    </Link>

                                </Grid>
                            </Grid>

                            {questions.map((qa, index) => (

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                            Q: {qa.question}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ color: '#616161', fontStyle: 'italic' }}>
                                            A: {qa.answer}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>

                    </Paper>

                    <br />
                    {photos.map((photo, index) => (
                        <Paper key={index} elevation={8} component={Box} square className={classes.paper}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        {photo.title?.[0]}
                                        {photo.subtitle?.[0]}
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
                                    src={photo ? photo.file : `${process.env.REACT_APP_BASE_URL}${photo.file}`} //{photo.file}
                                    alt="Uploaded Image"
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography variant="h6">{photo.title?.split(',')[0]}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {photo.tags}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {photo.blog?.split('.')[0]}
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
                                    image={add ? add.image : `${process.env.REACT_APP_BASE_URL}${add.image}`}
                                    alt={add.title}
                                    className={classes.media}
                                />
                                {/* {add ? add.image : `${process.env.REACT_APP_BASE_URL}${add.image}`} */}
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
