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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Card, List, Toolbar, AppBar, Drawer, Grid, Paper, Button, Menu, MenuItem, ListItemText, ListItemIcon, ListItem, Divider, Typography, CssBaseline, CardActionArea, CardMedia, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, DialogTitle, DialogContentText, DialogContent, TextField, Dialog, DialogActions } from "@material-ui/core";
import NewsServiceComponent from "../../service/NewsServiceComponent";
import PaperServiceComponent from "../../service/PaperServiceComponent";

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
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
    padding: theme.spacing.unit * 3,
    background: 'linear-gradient(65deg, #2196F3 70%, #21CBF3 30%)',
    minHeight: theme.spacing(90)
  },
  grow: {
    flexGrow: 1
  }
});

class UserNewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.match.params.userId,
      newsList: [],
      flag: false,
      userName: '',
      dialog: false,
      locationEdit: '',
      headlineEdit: '',
      newsDescriptionEdit: '',
      userObj: [],
      catObj: [],
      headlineValid: '',
      locationValid: '',
      newsDescriptionValid: ''
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

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  compareBy = (key) => {
    let flag = this.state.flag;
    if (flag) {
      this.setState({ flag: false });
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    } else {
      this.setState({ flag: true });
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
    }

  };

  sortBy = (key) => {
    let arrayCopy = [...this.state.newsList];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ newsList: arrayCopy });
  }

  edit = () => {
    let isValid = this.validate();
    if (!isValid) {
      return false;
    }
    else {
      let newsObj = { newsId: this.state.newsId, headline: this.state.headlineEdit, reporter: this.state.userObj, location: this.state.locationEdit, category: this.state.catObj, newsDescription: this.state.newsDescriptionEdit };
      NewsServiceComponent.updateNews(newsObj).then(res => {

      })
      this.setState({ dialog: false });
      window.location.reload(true);
    }

  }

  validate = () => {
    let flag = true;
    if ((this.state.locationEdit).length < 3) {
      flag = false;
      this.setState({ locationValid: "Location length should be more than 2 characters" });
    }
    if ((this.state.headlineEdit).length < 6) {
      flag = false;
      this.setState({ headlineValid: "Headline length should be more than 5 characters" });
    }
    if ((this.state.newsDescriptionEdit).length < 6) {
      flag = false;
      this.setState({ newsDescriptionValid: "Description should be more than 5 characters" });
    }
    return flag;
  }

  dialogOpen = (newsId) => {
    this.setState({ dialog: true });
    NewsServiceComponent.listNewsById(newsId).then(res => {
      this.setState({ userObj: res.data.reporter, catObj: res.data.category, locationEdit: res.data.location, headlineEdit: res.data.headline, newsDescriptionEdit: res.data.newsDescription });
    })
  }

  dialogClose = () => {
    this.setState({ dialog: false });
  }

  componentDidMount() {
    NewsServiceComponent.listNewsByReporter(this.state.userId).then(res => {
      this.setState({ newsList: res.data });
    })

    UserServiceComponent.listUserById(this.state.userId).then(res => {
      this.setState({ userName: res.data.userName });
    })
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
          <Grid container>
            <Grid item xs={12}>
              <Paper>
              <Typography variant="h5" style={{ paddingLeft: '10px' }}><i>{this.state.userName}: News List</i></Typography>
                <TableContainer style={{ padding: '10px', marginTop: '20px' }}>
                  <Table size="large" style={{ borderStyle: 'solid', borderColor: 'black', alignItems: 'center', }}>
                    <TableHead style={{ background: 'linear-gradient(65deg, #F4D03F 100%, #21CBF3 0%)', borderStyle: 'solid', borderColor: 'black', borderBottomWidth: '1' }}>
                      <TableRow>
                        <TableCell style={{ width: 100 }} align="center"><Button variant="text" onClick={() => this.sortBy('newsId')}><b>Id</b></Button></TableCell>
                        <TableCell style={{ width: 200 }} align="center"><b>HEADLINE</b></TableCell>
                        <TableCell style={{ width: 100 }} align="center"><Button variant="text" onClick={() => this.sortBy('location')}><b>Location</b></Button></TableCell>
                        <TableCell style={{ width: 100 }} align="center"><b>CATEGORY</b></TableCell>
                        <TableCell align="center"><b>DESCRIPTION</b></TableCell>
                        <TableCell align="center"><b>ACTION</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ background: 'linear-gradient(65deg, #F7DC6F 100%, #21CBF3 0%)', }}>
                      {
                        this.state.newsList.map(news => (
                          <TableRow key={news.newsId}>
                            <TableCell align="center">{news.newsId}</TableCell>
                            <TableCell align="center">{news.headline}</TableCell>
                            <TableCell align="center">{news.location}</TableCell>
                            <TableCell align="center">{news.category.categoryName}</TableCell>
                            <TableCell align="center">{news.newsDescription}</TableCell>
                            <TableCell align="center"><IconButton style={{ color: 'black' }} onClick={() => this.dialogOpen(news.newsId)}><EditRoundedIcon /></IconButton></TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <Dialog open={this.state.dialog} onClose={() => this.dialogClose()} fullWidth>
            <DialogTitle>Edit News</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                label="Location"
                margin="dense"
                name="locationEdit"
                value={this.state.locationEdit}
                onChange={this.myChangeHandler}
                error={this.state.locationValid.length === 0 ? false : true}
                helperText={this.state.locationValid}
                fullWidth
              ></TextField>
              <TextField
                autoFocus
                label="Headline"
                margin="dense"
                name="headlineEdit"
                value={this.state.headlineEdit}
                onChange={this.myChangeHandler}
                error={this.state.headlineValid.length === 0 ? false : true}
                helperText={this.state.headlineValid}
                fullWidth
              ></TextField>
              <TextField
                type="textarea"
                autoFocus
                label="Location"
                margin="dense"
                name="newsDescriptionEdit"
                value={this.state.newsDescriptionEdit}
                onChange={this.myChangeHandler}
                error={this.state.newsDescriptionValid.length === 0 ? false : true}
                helperText={this.state.newsDescriptionValid}
                fullWidth
              ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.edit()}>Submit</Button>
              <Button onClick={() => this.dialogClose()}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}

UserNewsList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserNewsList);
