import React from 'react';
import Axios from 'axios';

class HandleQueueUpdates{
    static addToSongQueue(token, songQueue) {
        console.log('Adding to song queue from handle queue updates...', songQueue);
        console.log('handling queue updates :)');

        //If it's the first song being added...
        if(songQueue.length === 1){
            Axios.put(
                "https://api.spotify.com/v1/me/player/play",
                {"uris" : [songQueue[0].songUri]},
                {headers : {"Authorization" : "Bearer " + token}});
        }
    }

    static startNewSong(){

    }
}

export default HandleQueueUpdates