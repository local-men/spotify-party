import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import '../../spotify-player';
import WebPlaybackReact from "../../spotify/WebPlaybackReact";



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
        console.log('....component recieving props....')

    }

    componentDidUpdate(){
        console.log('....Now playing component updated....')
    }

    changeUri = () => this.props.changeUri();

    render(){
        console.log('....component rendering....');
        console.log('---song queue:', this.props.songQueue);
        console.log('---token:', this.props.token);
        return(
            <div>
                <WebPlaybackReact
                    {...this.props.webPlaybackSdkProps}/>
                {this.props.playerSelected && <div>player selected!</div>}
            </div>
        );
    }
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
