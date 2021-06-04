import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { TextField, Typography } from '@material-ui/core';
import UserServiceComponent from '../../service/UserServiceComponent';
import { Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent';
import HeaderComponent from '../HeaderComponent';

const styles = theme => ({
    root: {
        flexGrow: 1,
        background: 'linear-gradient(45deg, #2196F3 30%, #AED6F1 90%)'
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: "center",
        color: theme.palette.text.secondary,
        margin: theme.spacing(3),
        marginTop: theme.spacing(16)

    }
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: '',
            passwordValid: ''
        }
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let isValid = this.validate();
        if (!isValid) {
            return false;
        }
        else {
            UserServiceComponent.login(this.state.email,this.state.password).then(res=>{
                this.setState({
                    email: '',
                    password: '',
                    emailValid: '',
                    passwordValid: ''
                });
                alert('Sign In Successful, Welcome '+res.data.userName);
                this.props.history.push("/userhome/"+res.data.userId);
            })
            
        }
        
    }

    onReset = (event) => {
        event.preventDefault();
        this.setState({
            email: '',
            password: '',
            emailValid: '',
            passwordValid: ''
        })
    }

    validate = () => {
        let flag = true;
        if ((this.state.email).length === 0) {
            flag = false;
            this.setState({ emailValid: 'Email Id is required' });
        }
        if ((this.state.password).length === 0) {
            flag = false;
            this.setState({ passwordValid: 'Password is required' });
        }
        return flag;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <HeaderComponent></HeaderComponent>
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} style={{ backgroundColor: "lemonchiffon" }}>
                            <Typography><PersonIcon fontSize="large" color="secondary"></PersonIcon></Typography>
                            <Typography variant="h6" style={{ color: "black" }}>Login Form</Typography>
                            <form noValidate autoComplete="off" onSubmit={this.onSubmit} onReset={this.onReset}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Id"
                                    name="email"
                                    type="email"
                                    autoFocus
                                    value={this.state.email}
                                    onChange={this.myChangeHandler}
                                    error={this.state.emailValid.length === 0 ? false : true}
                                    helperText={this.state.emailValid}

                                >
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoFocus
                                    value={this.state.password}
                                    onChange={this.myChangeHandler}
                                    error={this.state.passwordValid.length === 0 ? false : true}
                                    helperText={this.state.passwordValid}

                                >
                                </TextField>
                                <Grid container spacing={4}>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="contained" style={{ backgroundColor: "green", color: "white", marginTop: "4px" }} startIcon={<LockOpenRoundedIcon />}>Log In</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button type="reset" variant="contained" color="secondary" style={{ marginTop: "4px" }}>Reset</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
                <FooterComponent></FooterComponent>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);