import React from 'react';
import QueuedSongComponent from "./queuedSong";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class QueueWindowComponent extends React.Component {

    constructor(){
        super();
    }

    componentDidMount() {

    }

    render(){
        return(
            <div>
                Queue Window Component!!
                <QueuedSongComponent/>
            </div>
        );
    }
}

export default withStyles(styles)(QueueWindowComponent);