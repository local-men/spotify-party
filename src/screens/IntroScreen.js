import React, {Component, Fragment} from 'react';
import Login from '../spotify/Login.js';

export default class IntroScreen extends Component {
    buttonClick(){
        Login.logInWithSpotify();
    };

    render(){
        return(
            <Fragment>
                <p>Welcome to the intro screen!</p>
                <button className={'btn btn-md btn-violet'} onClick={this.buttonClick}>Log in with Spotify</button>
            </Fragment>
        )
    }
}