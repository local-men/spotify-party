import React from 'react';
import QueuedSongComponent from "./queuedSong";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class QueueWindowComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            songQueue: []
        }
    }

    componentDidMount() {

    }

    render(){
        console.log('the song queue now in here :)', this.props.songQueue);
        return(
            <div>
                Queue Window Component!!
                {
                    
                }
                <QueuedSongComponent/>
            </div>
        );
    }
}

export default withStyles(styles)(QueueWindowComponent);
