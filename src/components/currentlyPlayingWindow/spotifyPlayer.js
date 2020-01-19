import React, {Component} from 'react';
import {IconButton} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export default class SpotifyPlayer extends Component {

    playOrPause = (paused) => this.props.playOrPause(paused);

    enfOfSong = () => this.props.endOfSong();

    render(){
        let {
            playerState,
            playerState: { position: position_ms },
        } = this.props;

        let {
            id,
            uri: track_uri,
            name: track_name,
            duration_ms,
            artists: [{
                name: artist_name,
                uri: artist_uri
            }],
            album: {
                name: album_name,
                uri: album_uri,
                images: [{ url: album_image }]
            }
        } = playerState.track_window.current_track;

        console.log('THE PLAYERSTATE! ', playerState);

        //If the song has 400ms left to go AND it's over half way
        if(((duration_ms % position_ms) < 400) && (position_ms > (duration_ms/2))){
            this.enfOfSong()
        }

        return(
            <div>
                <div>
                    <img src={album_image} alt={track_name} />
                    <br/>
                    <h4> <a href={track_uri}> {track_name} </a> by <a href={artist_uri}> {artist_name} </a></h4>
                    <h4> <a href={album_uri}> {album_name} </a></h4>
                    <h4> ID: {id} | Position: {position_ms} | Duration: {duration_ms}</h4>
                </div>
                <div>
                    <IconButton onClick={() => this.playOrPause(playerState.paused)}>
                    {playerState.paused ?
                        <PlayArrowIcon/>
                        : <PauseIcon/>}
                    </IconButton>
                    <IconButton>
                        <SkipNextIcon/>
                    </IconButton>
                </div>
            </div>
        )
    }
}