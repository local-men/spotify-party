import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class QueuedSongComponent extends React.Component {

    constructor(){
        super();
    }

    componentDidMount() {

    }

    render(){
        return(
            <div>Queued Song Component!</div>
        );
    }
}

export default withStyles(styles)(QueuedSongComponent);