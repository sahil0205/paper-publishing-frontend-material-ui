import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import UserServiceComponent from '../../service/UserServiceComponent';
import { Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent';
import RegistrationHeader from './RegistrationHeader';


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

    },
    formControl: {
        minWidth: 120,
    },
});
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userNameValid: '',
            role: '',
            roleValid: '',
            contact:'',
            contactValid:'',
            email: '',
            emailValid: '',
            password: '',
            passwordValid: ''
        }
    }

    onReset = (event) => {
        event.preventDefault();
        this.setState({
            userName: '',
            userNameValid: '',
            role: '',
            roleValid: '',
            email: '',
            emailValid: '',
            password: '',
            passwordValid: '',
            contact:'',
            contactValid:'',
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        let isValid = this.validate();
        if(!isValid){
            return false;
        }
        else{
            let userObj = {userName: this.state.userName, role: this.state.role, contactNumber: this.state.contact, emailId: this.state.email, password: this.state.password};
            UserServiceComponent.addUser(userObj).then(res =>{
                alert("Registration Successful, Welcome "+res.data.userName);
                this.props.history.push('/');
            }).catch(error =>{
                alert(error.response.data);
            })
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    validate = () => {
        let flag = true;
        let emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        let passPattern = new RegExp("^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\\d)+(?=.*[@$!%*?&])+[A-Za-z\\d@$!%*?&]{8,}$");
        let contactPattern = new RegExp("^\\d{10}$");
        if ((this.state.userName).length === 0) {
            flag = false;
            this.setState({ userNameValid: 'Name cannot be empty' });
        }
        if ((this.state.role).length === 0) {
            flag = false;
            this.setState({ roleValid: 'Select an appropriate role' });
        }
        if (!emailPattern.test(this.state.email) || (this.state.email).length === 0) {
            flag = false;
            this.setState({ emailValid: 'Invalid Email' })
        }
        if (!passPattern.test(this.state.password) || (this.state.password).length === 0) {
            flag = false;
            this.setState({ passwordValid: "Password should contain minimum 8 characters, atleast one digit, uppecase, lower case and special character" });
        }
        if (!contactPattern.test(this.state.contact) || (this.state.contact).length === 0) {
            flag = false;
            this.setState({ contactValid: "Enter valid contact number"});
        }
        return flag;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <RegistrationHeader></RegistrationHeader>
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} style={{ backgroundColor: "lemonchiffon" }}>
                            <Typography><PersonIcon fontSize="large" color="secondary"></PersonIcon></Typography>
                            <Typography variant="h6" style={{ color: "black" }}>New User Registration</Typography>
                            <form noValidate autoComplete="off" onSubmit={this.onSubmit} onReset={this.onReset}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Name"
                                    name="userName"
                                    type="text"
                                    autoFocus
                                    value={this.state.userName}
                                    onChange={this.myChangeHandler}
                                    error={this.state.userNameValid.length === 0 ? false : true}
                                    helperText={this.state.userNameValid}
                                >
                                </TextField>
                                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        native
                                        id="text"
                                        name="role"
                                        value={this.state.role}
                                        onChange={this.myChangeHandler}
                                        label="Role">
                                        <option value=""></option>
                                        <option value="Editor">Editor</option>
                                        <option value="Reporter">Reporter</option>
                                    </Select>
                                </FormControl>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact"
                                    name="contact"
                                    type="text"
                                    autoFocus
                                    value={this.state.contact}
                                    onChange={this.myChangeHandler}
                                    error={this.state.contactValid.length === 0 ? false : true}
                                    helperText={this.state.contactValid}

                                >
                                </TextField>
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
                                        <Button type="submit" variant="contained" style={{ backgroundColor: "green", color: "white", marginTop: "4px" }} startIcon={<LockOpenRoundedIcon />}>Register</Button>
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

export default withStyles(styles)(Registration);