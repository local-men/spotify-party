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
    static async endOfSong(token, songQueue){
        //If length of queue more then one
        if(songQueue.length > 1){
            await this.playSong(token, songQueue[1].songUri);
            console.log('waiting to finish')
            // await this.waitForFinish(token, songQueue[1].songUri);
            // console.log('did the finish')
        }else{

        }
    }

    static async waitForFinish(token, songUri){
        let waitingResponse = false;
        await Axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {headers : {"Authorization" : "Bearer " + token}}
        ).then((response) =>{

            console.log('passed in song uri: ', songUri);
            console.log('response uri: ', response.data.item.uri);
            if(response.data.item.uri !== songUri){
                //current song has passed...
                console.log('response songs arent the same');
                waitingResponse = true;
            } else{
                console.log('response songs are the same');
                waitingResponse = false;
            }
            //If the currently playing song DOESN'T equal
        });

        return waitingResponse;
    }

    /** This function plays songs **/
    static async playSong(token, songUri){
        console.log("action during ... playing song")
        await Axios.put(
            "https://api.spotify.com/v1/me/player/play",
            {"uris" : [songUri]},
            {headers : {"Authorization" : "Bearer " + token}});
        console.log("action during finished playing song...");
    }
}

export default HandleQueueUpdates