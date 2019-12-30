import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        this.setState({
            token: this.props.token
        })
    }

    render(){
        return(
            <SpotifyPlayer
            token={this.state.token}
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
            autoPlay={false}
            name={"Spotify House Party"}/>
        );
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);