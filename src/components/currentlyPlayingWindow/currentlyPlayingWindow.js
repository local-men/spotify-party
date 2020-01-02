import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

var songQueue = ['spotify:track:2lK2CqSAHK6QkdQOvk3vFJ', "spotify:track:7sO5G9EABYOXQKNPNiE9NR"];
var songQueue2 = ['spotify:track:2e3g8go386Zn6EyIz60Ci9'];

class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            token: '',
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
        // var someArr = this.state.songQueue;
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
        // console.log('big pooz');
        // state.track = {name: 'beans'};
        // state.nextTracks.concat();
        console.log(state)
        //This is working, but there is a flash on the image when re-rendering the state, sometimes audio jumps too...
        // this.changeUri();
    };

    //TODO: this works for now.
    changeUri = () => {
        let originalQueue = this.state.songQueue;
        this.setState({songQueue: originalQueue.concat(songQueue2)});
        // this.setState({songQueue: this.state.songQueue.concat('spotify:track:2e3g8go386Zn6EyIz60Ci9'), someBool: false})
        // this.props.songQueue.concat('spotify:track:2e3g8go386Zn6EyIz60Ci9');
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
