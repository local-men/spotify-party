import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            token: '',
            currentUri: ["spotify:track:2lK2CqSAHK6QkdQOvk3vFJ", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"],
            someBool: false,
            nextSong: true
        }
    }

    componentDidMount() {
        this.setState({
            token: this.props.token
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.changeUri}> change between 2 songs. </button>
                <SpotifyPlayer
                    token={this.state.token}
                    uris={this.state.currentUri}
                    autoPlay={false}
                    name={"Spotify House Party"}
                    callback={state => this.handleState(state)}/>
            </div>
        );
    }

    //State change
    handleState = (state) => {
        //If next song is true
        if(this.state.nextSong){
            this.changeUri();
            this.setState({nextSong: false})
        } else{
            this.setState({nextSong: true})
        }
    };

    //TODO: this works for now.
    changeUri = () => {
        this.state.someBool ?
            this.setState({currentUri: ["spotify:track:2lK2CqSAHK6QkdQOvk3vFJ", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"], someBool: false})
                :
            this.setState({currentUri: ['spotify:track:7sO5G9EABYOXQKNPNiE9NR', "spotify:track:2lK2CqSAHK6QkdQOvk3vFJ"], someBool: true});
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
