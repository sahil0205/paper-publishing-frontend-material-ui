import React, { Component } from 'react';

class MyAccount extends Component {
    constructor(props){
        super(props);
        this.state={
            userId: this.props.match.params.userId,
        }
    }
    render() {
        console.log(this.state.userId);
        return (
            <div>
                
            </div>
        );
    }
}

export default MyAccount;