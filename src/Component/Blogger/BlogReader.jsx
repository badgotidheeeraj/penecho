import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Grid, Paper, CardHeader, Avatar, TextField, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Button
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
    marginBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  commentButton: {
    marginTop: theme.spacing(2),
  }
}));

function ResponsiveCard() {
  const location = useLocation();
  const classes = useStyles();
  const [detailData, setDetailData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { token } = useContext(UserContext);
  
  useEffect(() => {
    const fetchDetailsAndComments = async () => {
      const id = new URLSearchParams(location.search).get('id');
      try {
        const detailResult = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/blogs/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setDetailData(detailResult.data.data);

        // Fetch comments
        const commentsResult = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/comments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              blog_id: id
            }
          }
        );
        setComments(commentsResult.data);
        console.log(commentsResult.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetailsAndComments();
  }, [location.search, token]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCommentSubmit = async () => {
    const id = new URLSearchParams(location.search).get('id');
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/`,
        { text: newComment, blog: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setComments([...comments, result.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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
            {/* Main Content */}
            <Paper elevation={15} className={classes.paper}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {detailData.title ? detailData.title[0] : ''}
                  </Avatar>
                }
                title={detailData.title}
                subheader={new Date(detailData.DateTime).toLocaleString()}
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={detailData.file}
                  className={classes.media}
                  alt="Photo"
                />
                <CardContent>
                  <Typography variant="h6">
                    {detailData.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Paper>

            {/* Comments */}
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              {comments.map((comment, index) => (
                <Paper key={index} className={classes.paper}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        {comment.author ? comment.author[0] : ''}
                      </Avatar>
                    }
                    title={comment.author}
                    subheader={new Date(comment.created_at).toLocaleString()}
                  />
                  <CardContent>
                    <Typography variant="body1">
                      {comment.text}
                    </Typography>
                  </CardContent>
                </Paper>
              ))}
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Add a comment"
                placeholder="Type your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.commentButton}
                onClick={handleCommentSubmit}
              >
                Submit Comment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ResponsiveCard;
