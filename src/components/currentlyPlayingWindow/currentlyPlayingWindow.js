import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';



class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            playing: true,
            previousSong: '',
            currentSong: '',
            nextSong: '',
            lastSong: '',
            changingTrack: false
        }
    }

    componentDidMount() {
        // console.log('....component mounting....')
        // this.setState({
        //     // previousSong: this.props.previousSong,
        //     // currentSong: this.props.currentSong,
        //     // nextSong: this.props.nextSong,
        //     // lastSong: this.props.lastSong,
        //     songQueue:
        //
        // })
        console.log('aadsada')
    }

    componentWillReceiveProps(nextProps){
        console.log('....component recieving props....')
        //Gets newly passed in song data props
        // let newSongQueue = this.state.songQueue.splice(this.state.songQueue, 3).splice(this.state.songQueue, 2);
        // newSongQueue = newSongQueue.concat(nextProps.nextSong).concat(nextProps.lastSong);
        //

        // this.setState({
        //     songQueue: this.state.songQueue.concat(nextProps.lastSong)
        // })

        //     songQueue:
        // })
        //Don't touch current song playing in the queue's state
        //Update next song in queue with next song prop
        //Update last song in queue with last song prop
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     // console.log('....should component update?....');
    //     // return false;
    // }

    componentDidUpdate(){
        console.log('....Now playing component updated....')
    }


    render(){
        console.log('....component rendering....');
        console.log('---song queue:', this.props.songQueue);
        console.log('---token:', this.props.token);
        return(
            <div>
                <button onClick={this.addToSongQueue}> change between 2 songs. </button>

            </div>
        );
    }

    addToSongQueue = () => this.props.addToSongQueue();

    //State change,
    handleState = async(state) => {
        // console.log('....state callback called....')
        //
        // //If the current song in the state call back doesn't equal the current state song
        // if(state.track.uri !== this.state.currentSong && state.track.uri !== ""){
        //     //call function that updates the state next and current track back in app.js
        //     this.setState({changingTrack: true});
        //     let newSongQueue = [];
        //
        //     await(newSongQueue = this.changeTrack(this.state.previousSong));
        //
        //     // this.setState({
        //     //     // songQueue: this.state.songQueue.concat(newSongQueue[0][1])
        //     // })
        // }

    };

    // changeTrack = (currentTrackUri) => this.props.changeTracks(currentTrackUri)
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
