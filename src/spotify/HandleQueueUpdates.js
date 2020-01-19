import React from 'react';
import Axios from 'axios';

class HandleQueueUpdates{
    /** This function checks if it's the first song being played...**/
    static addToSongQueue(token, songQueue) {
        console.log('Adding to song queue from handle queue updates...', songQueue);
        console.log('handling queue updates :)');

        //If it's the first song being added...
        if(songQueue.length === 1){
            //Play the song
           this.playSong(token, songQueue[0].songUri);
        }
    }
    /** **/
    static endOfSong(token, songQueue){
        //If length of queue more then one
        if(songQueue.length > 1){
            this.playSong(token, songQueue[1].songUri);
        }else{

        }
    }

    /** This function plays songs **/
    static playSong(token, songUri){
        Axios.put(
            "https://api.spotify.com/v1/me/player/play",
            {"uris" : [songUri]},
            {headers : {"Authorization" : "Bearer " + token}});
    }
}

export default HandleQueueUpdates