import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {GiNewspaper} from 'react-icons/gi';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <GiNewspaper size={32} className="icon-middle"/><b>The People's Paper</b>
          </Typography>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}