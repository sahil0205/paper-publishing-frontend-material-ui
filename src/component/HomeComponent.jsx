import React, { Component } from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import PaperBackground from '../images/paper15.jpeg';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, CssBaseline, Typography } from '@material-ui/core';
import LoginForm from './user/LoginForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
});

class HomeComponent extends Component {
   
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <CssBaseline />
                <HeaderComponent></HeaderComponent>
                <LoginForm></LoginForm>
                <FooterComponent></FooterComponent>
            </div>
        );
    }
}

export default withStyles(styles) (HomeComponent);