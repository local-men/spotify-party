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
        // console.log('the song queue now in here :)', this.props.songQueue);
        return(
            <div>
                Queue Window Component
                {
                    this.props.songQueue.map((_song, _index) =>{
                        return(
                            <div key={_index}>
                                <QueuedSongComponent
                                    songUri={_song.songUri}
                                    songTitle={_song.songTitle}
                                    artistName={_song.artistName}
                                    imageSrc={_song.imageSrc}
                                    votes={_song.votes}
                                />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(QueueWindowComponent);
