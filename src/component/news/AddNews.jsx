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
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import SaveIcon from '@material-ui/icons/Save';
import { Card, List, Toolbar, AppBar, Drawer, Grid, Paper, Button, Menu, MenuItem, ListItemText, ListItemIcon, ListItem, Divider, Typography, CssBaseline, CardActionArea, CardMedia, CardContent, FormControl, InputLabel, TextField, Select } from "@material-ui/core";
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
        background: 'linear-gradient(65deg, #2196F3 70%, #21CBF3 30%)',
    },
    grow: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: "center",
        color: theme.palette.text.secondary,
        margin: theme.spacing(3),
        marginTop: theme.spacing(4.5)
    }
});

class AddNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.match.params.userId,
            userName: '',
            headline: '',
            headlineValid: '',
            newsDescription: '',
            newsDescriptionValid: '',
            location: '',
            locationValid: '',
            category: '',
            categoryValid:'',
            catList: [],
            userObj:[],
            catObj:[]
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

    validate = () => {
        let flag = true;
        if((this.state.category).length === 0){
            flag=false;
            this.setState({categoryValid: "Choose a category"});
        }
        if((this.state.location).length < 3){
            flag = false;
            this.setState({locationValid: "Location length should be more than 2 characters"});
        }
        if((this.state.headline).length < 6){
            flag = false;
            this.setState({headlineValid: "Headline length should be more than 5 characters"});
        }
        if((this.state.newsDescription).length < 6){
            flag = false;
            this.setState({newsDescriptionValid: "Description should be more than 5 characters"});
        }
        return flag;
    }

    onSubmit = (event) => {
        event.preventDefault();
        let isValid = this.validate();
        if(!isValid){
            return false;
        }
        else{
           UserServiceComponent.listUserById(this.state.userId).then(res=>{
               this.setState({userObj: res.data});

               CategoryServiceComponent.listCategoryById(this.state.category).then(res =>{
                   this.setState({catObj: res.data});

                   let newsObj = {headline: this.state.headline, reporter: this.state.userObj, location: this.state.location, category: this.state.catObj, newsDescription: this.state.newsDescription};
                   NewsServiceComponent.addNews(newsObj).then(res=>{
                       alert("News Added");
                       this.props.history.push("/userhome/"+res.data.userId);
                   })
               })
           })
        }
    }

    onReset = () => {
        this.setState({
            headline: '',
            headlineValid: '',
            newsDescription: '',
            newsDescriptionValid: '',
            location: '',
            locationValid: '',
            category: '',
            categoryValid:'',
        })
    }

    componentDidMount() {
        UserServiceComponent.listUserById(this.state.userId).then(res => {
            this.setState({ userName: res.data.userName });
        })

        CategoryServiceComponent.listAllCategories().then(res => {
            this.setState({ catList: res.data });
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
                            <Paper className={classes.paper}>
                                <Typography variant="h6" style={{ color: "black" }}>New News Details</Typography>
                                <form noValidate autoComplete="off" onSubmit={this.onSubmit} onReset={this.onReset}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="userName"
                                        label="Name"
                                        name="userName"
                                        type="text"
                                        autoFocus
                                        value={this.state.userName}
                                        readOnly
                                        style={{ width: '50%', paddingRight: '3px' }}
                                    >
                                    </TextField>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="location"
                                        label="Location"
                                        name="location"
                                        type="text"
                                        onChange={this.myChangeHandler}
                                        autoFocus
                                        value={this.state.location}
                                        style={{ width: '50%', paddingLeft: '3px' }}
                                        error={this.state.locationValid.length === 0 ? false : true}
                                        helperText={this.state.locationValid}
                                    >
                                    </TextField>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            native
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.myChangeHandler}
                                            label="Category"
                                            error={this.state.categoryValid.length === 0 ? false : true}
                                            required
                                        >
                                            <option value=""></option>
                                            {
                                                this.state.catList.map(cat => 
                                                        <option value={cat.categoryId}>{cat.categoryName}</option>
                                                    )
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="headline"
                                        label="Headline"
                                        name="headline"
                                        type="text"
                                        onChange={this.myChangeHandler}
                                        autoFocus
                                        value={this.state.headline}
                                        fullWidth
                                        error={this.state.headlineValid.length === 0 ? false : true}
                                        helperText={this.state.headlineValid}
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="newsDescription"
                                        label="Description"
                                        name="newsDescription"
                                        type="textarea"
                                        onChange={this.myChangeHandler}
                                        autoFocus
                                        value={this.state.newsDescription}
                                        fullWidth
                                        error={this.state.newsDescriptionValid.length === 0 ? false : true}
                                        helperText={this.state.newsDescriptionValid}
                                    ></TextField>
                                    <Grid container spacing={4}>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="contained" style={{ backgroundColor: "green", color: "white", marginTop: "4px" }} startIcon={<SaveIcon />}>Save</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button type="reset" variant="contained" color="secondary" style={{ marginTop: "4px" }}>Reset</Button>
                                    </Grid>
                                </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

AddNews.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AddNews);
