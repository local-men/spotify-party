import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            token: '',
            uriArray: ["spotify:track:2lK2CqSAHK6QkdQOvk3vFJ", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"],
            songQueue: ["spotify:track:2lK2CqSAHK6QkdQOvk3vFJ", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"],
            playing: true,
            someBool: false,
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
                    uris={this.state.songQueue}
                    autoPlay={false}
                    play={this.state.playing}
                    name={"Spotify House Party"}
                    callback={(state) => this.handleState(state)}/>
            </div>
        );
    }

    //State change,
    handleState = async(state) => {
        console.log('big poop');
        //This is working, but there is a flash on the image when re-rendering the state, sometimes audio jumps too...
        this.setState({songQueue: this.state.uriArray});
    };

    //TODO: this works for now.
    changeUri = () => {
        this.state.someBool ?
            this.setState({uriArray: ["spotify:track:2lK2CqSAHK6QkdQOvk3vFJ", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"], someBool: false})
                :
            this.setState({uriArray: ["spotify:track:2e3g8go386Zn6EyIz60Ci9", "spotify:track:2lK2CqSAHK6QkdQOvk3vFJ"], someBool: true});
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
