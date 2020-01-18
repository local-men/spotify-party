import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import '../../spotify-player';
import WebPlaybackReact from "../../spotify/WebPlaybackReact";
import SpotifyPlayer from "./spotifyPlayer";



class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount() {
        console.log('aadsada')
    }

    componentWillReceiveProps(nextProps){

    }

    componentDidUpdate(){

    }

    changeUri = () => this.props.changeUri();

    render(){
        return(
            <div>
                <WebPlaybackReact
                    {...this.props.webPlaybackSdkProps}/>
                 {this.props.playerSelected  && this.props.playerState != null ? <SpotifyPlayer playerState={this.props.playerState}/> : null}
            </div>
        );
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
