import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { GiNewspaper } from 'react-icons/gi';
import { ImPriceTags } from 'react-icons/im';
import { HiPaperAirplane } from 'react-icons/hi';
import { AiTwotonePhone } from 'react-icons/ai';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import UserServiceComponent from "../../service/UserServiceComponent";
import { Link } from "react-router-dom";
import { Card, List, Toolbar, AppBar, Drawer, Grid, Paper, Button, Menu, MenuItem, ListItemText, ListItemIcon, ListItem, Divider, Typography, CssBaseline, CardActionArea, CardMedia, CardContent } from "@material-ui/core";
import NewsServiceComponent from "../../service/NewsServiceComponent";
import PaperServiceComponent from "../../service/PaperServiceComponent";

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  }
});

class OnLoginHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.match.params.userId,
    }
  }
  state = {
    open: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  helpline = () => {
    alert("For assistance call: +91 9876543210");
  }

  aboutUs = () => {
    alert("CodeManiacs. All Rights Reserved.");
  }

  render() {
    console.log(this.props);
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              <GiNewspaper size={32} className="icon-middle" /><b>The People's Paper</b>
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <Link className="link" to={{ pathname: '/myaccount/' + this.state.userId }}><MenuItem onClick={this.handleClose}>My Account</MenuItem></Link>
                <Link className="link" to="/"><MenuItem onClick={UserServiceComponent.logout}>Sign Out</MenuItem></Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List>
            <Link className="link" to={{ pathname: '/userhome/' + this.state.userId }}>
              <ListItem button >
                <ListItemIcon ><GroupRoundedIcon></GroupRoundedIcon></ListItemIcon>
                <ListItemText >User Module</ListItemText>
              </ListItem>
            </Link>
            <Link className="link" to={{ pathname: '/cathome/' + this.state.userId }}>
              <ListItem button >
                <ListItemIcon><ImPriceTags size={23}></ImPriceTags></ListItemIcon>
                <ListItemText >Category Module</ListItemText>
              </ListItem>
            </Link>
            <Link className="link" to={{ pathname: '/newshome/' + this.state.userId }}>
              <ListItem button >
                <ListItemIcon><CreateRoundedIcon></CreateRoundedIcon></ListItemIcon>
                <ListItemText >News Module</ListItemText>
              </ListItem>
            </Link>
            <Link className="link" to={{ pathname: '/paphome/' + this.state.userId }}>
              <ListItem button >
                <ListItemIcon ><HiPaperAirplane size={23}></HiPaperAirplane></ListItemIcon>
                <ListItemText >Paper Module</ListItemText>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button >
              <ListItemIcon onClick={this.helpline}><AiTwotonePhone size={23}></AiTwotonePhone></ListItemIcon>
              <ListItemText >Help Center</ListItemText>
            </ListItem>
            <ListItem button >
              <ListItemIcon onClick={this.aboutUs}><InfoRoundedIcon></InfoRoundedIcon></ListItemIcon>
              <ListItemText >About Us</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

OnLoginHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OnLoginHeader);
