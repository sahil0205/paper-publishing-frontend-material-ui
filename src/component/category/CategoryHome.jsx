import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { GiNewspaper } from 'react-icons/gi';
import { ImPriceTags } from 'react-icons/im';
import { HiPaperAirplane } from 'react-icons/hi';
import { AiTwotonePhone } from 'react-icons/ai';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import UserServiceComponent from "../../service/UserServiceComponent";
import { Link } from "react-router-dom";
import { Card, List, Toolbar, AppBar, Drawer, Grid, Paper, Button, Menu, MenuItem, ListItemText, ListItemIcon, ListItem, Divider, Typography, CssBaseline, CardActionArea, CardMedia, CardContent, TableContainer, TableRow, TableCell, Table, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import NewsServiceComponent from "../../service/NewsServiceComponent";
import PaperServiceComponent from "../../service/PaperServiceComponent";
import CategoryServiceComponent from "../../service/CategoryServiceComponent";

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
    background: 'linear-gradient(65deg, #2196F3 70%, #21CBF3 30%)'
  },
  grow: {
    flexGrow: 1
  },
  button: {
    background: 'linear-gradient(45deg, #21CBF3 30%, #AED6F1 90%)'
  }
});

class CategoryHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      catList: [],
      flag: true,
      dialog: false,
      catName: '',
      editDialog: false,
      catIdEdit: '',
      catNameEdit: ''
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

  dialogOpen = () => {
    this.setState({ dialog: true });
  }

  dialogClose = () => {
    this.setState({ dialog: false });
  }

  dialogOpenEdit = (categoryId) => {
    this.setState({ editDialog: true });
    CategoryServiceComponent.listCategoryById(categoryId).then(res => {
      this.setState({ catIdEdit: res.data.categoryId, catNameEdit: res.data.categoryName });
    })
  }

  dialogCloseEdit = () => {
    this.setState({ editDialog: false });
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
  }

  sortBy = (key) => {
    let arrayCopy = [...this.state.catList];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ catList: arrayCopy });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  submit = (catName) => {
    this.setState({ dialog: false });
    let catObj = { categoryName: catName };
    CategoryServiceComponent.addNewCategory(catObj).then(res => {

    })
    window.location.reload(true);
  }

  delete = (categoryId) => {
    CategoryServiceComponent.deleteCategory(categoryId).then(res => {
      this.setState({
        catList: this.state.catList.filter(catList => catList.categoryId !== categoryId)
      })
    })
  }

  edit = (catId, catName) => {
    let catObj = { categoryId: catId, categoryName: catName };
    CategoryServiceComponent.updateCategory(catObj).then(res => {

    });
    this.setState({ editDialog: false });
    window.location.reload(true);
  }

  componentDidMount() {
    CategoryServiceComponent.listAllCategories().then(res => {
      this.setState({ catList: res.data });
    })
  }

  render() {
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
          <Button style={{ marginLeft: '10px' }} onClick={() => this.dialogOpen()} className={classes.button}>Add New Category</Button>
          <Dialog open={this.state.dialog} onClose={() => this.dialogClose()} fullWidth>
            <DialogTitle>New Category</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter New Category Name</DialogContentText>
              <TextField
                autoFocus
                label="Category Name"
                margin="dense"
                name="catName"
                onChange={this.myChangeHandler}
                type="text"
                fullWidth
              ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.submit(this.state.catName)}>Submit</Button>
              <Button onClick={() => this.dialogClose()}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <p className="p"><h1>Category List</h1></p>
              <TableContainer style={{ padding: '10px', marginTop: '20px' }}>
            <Table size="large" style={{ borderStyle: 'solid', borderColor: 'black', alignItems: 'center', }}>
              <TableHead style={{ background: 'linear-gradient(65deg, #F4D03F 100%, #21CBF3 0%)', borderStyle: 'solid', borderColor: 'black', borderBottomWidth: '1' }}>
                <TableRow style={{ justifyContent: 'center' }}>
                  <TableCell align="center" style={{ width: 300 }}><Button variant="text" onClick={() => this.sortBy('categoryId')}><b>Id</b></Button></TableCell>
                  <TableCell align="center" style={{ width: 400 }}><Button variant="text" onClick={() => this.sortBy('categoryName')}><b>Category Name</b></Button></TableCell>
                  <TableCell colSpan="2" align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ background: 'linear-gradient(65deg, #F7DC6F 100%, #21CBF3 0%)', }}>
                {
                  this.state.catList.map(cat => (
                    <TableRow key={cat.categoryId}>
                      <TableCell align="center">{cat.categoryId}</TableCell>
                      <TableCell align="center">{cat.categoryName}</TableCell>
                      <TableCell align="center"><IconButton style={{ color: 'black' }} onClick={() => this.dialogOpenEdit(cat.categoryId)}><EditRoundedIcon /></IconButton></TableCell>
                      <TableCell align="center"><IconButton style={{ color: 'black' }} onClick={() => this.delete(cat.categoryId)}><DeleteForeverRoundedIcon /></IconButton></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <Dialog open={this.state.editDialog} onClose={() => this.dialogCloseEdit()} fullWidth>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
              <DialogContentText>Edit Category Name</DialogContentText>
              <TextField
                autoFocus
                label="Category Id"
                margin="dense"
                value={this.state.catIdEdit}
                readOnly
                fullWidth
              ></TextField>
              <TextField
                autoFocus
                label="Category Name"
                margin="dense"
                name="catNameEdit"
                value={this.state.catNameEdit}
                onChange={this.myChangeHandler}
                type="text"
                fullWidth
              ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.edit(this.state.catIdEdit, this.state.catNameEdit)}>Submit</Button>
              <Button onClick={() => this.dialogCloseEdit()}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}

CategoryHome.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CategoryHome);
