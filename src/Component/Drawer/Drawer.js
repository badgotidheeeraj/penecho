import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Divider, Link } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const DrawerComponent = ({ left, toggleDrawerHandler }) => {
  const classes = useStyles();

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawerHandler}
      onKeyDown={toggleDrawerHandler}
    >
      <List>
        <Link href="/home-page" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="create-blog" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button key="Create">
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary='Create Blog' />
          </ListItem>
        </Link>
        <Link href="/post" style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItem button key="Add Post">
            <ListItemIcon><LanguageSharpIcon /></ListItemIcon>
            <ListItemText primary='Add Post' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

    </div>

  );

  return (
    <>
      <Drawer open={left} onClose={toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>

    </>
  );
};

export default DrawerComponent;
