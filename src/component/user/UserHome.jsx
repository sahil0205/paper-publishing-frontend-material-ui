import React, { Component } from 'react';
import OnLoginHeader from './OnLoginHeader';
import { withRouter } from 'react-router-dom';

class UserHome extends Component {
    constructor(props){
        super(props);
        this.state={
            userId: this.props.match.params.userId,
        }
      }
    render() {
        const userId = this.state.userId;
        return (
            <div>
                <OnLoginHeader userId = {userId}/>
            </div>
        );
    }
}

export default withRouter(UserHome);