import React ,{useContext} from "react";
import { TextField, Button, Paper, Box, Typography, Container, Grid } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../Auth/UserContext';

import axios from "axios";
import DrawerComponent from "../Drawer/Drawer";
import ToolbarComponent from "../Toolbar/Toolbar";
import Image from 'react-bootstrap/Image';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
    },
    media: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        overflow: "hidden",
        margin: "0 auto",
        marginBottom: theme.spacing(2),
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        display: "block",
        margin: "0 auto",
    },
}));

const App = () => {
    const classes = useStyles();
    const { token } = useContext(UserContext);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({});
    const [userAccount, setUserAccount] = React.useState({});

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/show-userProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                setUserData(response.data.data);
                setUserAccount(response.data.data.userAccount);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    React.useEffect(() => {
        fetchUserData();
    }, []);

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
                <Paper component={Box} elevation={16} className={classes.paper}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Profile Information
                    </Typography>

                    <Box component="form" mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Image src={`${process.env.REACT_APP_BASE_URL}${userData.profilePic}`} className={classes.media} roundedCircle />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="First Name"
                                    variant="outlined"
                                    value={userAccount.first_name || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="Last Name"
                                    variant="outlined"
                                    value={userAccount.last_name || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="Email"
                                    variant="outlined"
                                    value={userAccount.email || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="Phone"
                                    variant="outlined"
                                    value={userData.phoneNo || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Address"
                                    variant="outlined"
                                    value={userData.Adress || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="City"
                                    variant="outlined"
                                    value={userData.City || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    placeholder="State"
                                    variant="outlined"
                                    value={userData.state || ''}
                                    className={classes.input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default App;

