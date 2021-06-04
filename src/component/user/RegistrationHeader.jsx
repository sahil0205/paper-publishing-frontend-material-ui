import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {GiNewspaper} from 'react-icons/gi';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(65deg, #2196F3 70%, #AED6F1 30%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function RegistrationHeader() {
  const classes = useStyles();
  const aboutUs = () => {
    alert("CodeManiacs. All Rights Reserved.");
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{background: 'linear-gradient(65deg, #2196F3 70%, #21CBF3 30%)'}}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <GiNewspaper size={32} className="icon-middle"/><b>The People's Paper</b>
          </Typography>
          <Button color="inherit" onClick={aboutUs}>About Us</Button>
          <Link className="link2" to={{pathname: '/'}}><Button color="inherit">Sign In</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}