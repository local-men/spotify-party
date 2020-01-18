import Axios from "axios";

/** This function initializes the playlist and get's it ready to have songs added to it. Returns playlist **/
export default async(token) => {
        //Does the playlist already exist
        let playlist = null;
        let authHeader = {"Authorization" : "Bearer " + token};

        //Search through playlists for one with name "spotify party"
        await Axios.get(
            'https://api.spotify.com/v1/me/playlists',
            {headers: authHeader}
        ).then(function (response){
            response.data.items.forEach(function(userPlaylist){
                if(userPlaylist.name === "Spotify Party"){
                    playlist = userPlaylist;
                }
            })
        });

        //If playlist already exist
        if(playlist){
            //If the playlist has tracks
            if(playlist.tracks.total !== 0){
                console.log('PLAYLIST EXISTS AND HAS TRACKS!');
                //Get the tracks that belong to the playlist
                await Axios.get(
                    `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
                    {headers: authHeader}
                ).then(async response => {
                    //Run through response tracks and create an array of URI's
                    let uriArray = response.data.items.map(item => {
                        return {"uri" : item.track.uri}
                    });

                    //Remove tracks from playlist
                    await Axios.delete(
                        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
                        {headers: authHeader,
                            data: {"tracks" : uriArray}},
                    );
                });
            }
        } else{
            //Get current user ID
            await Axios.get(
                'https://api.spotify.com/v1/me',
                { headers : {"Authorization" : "Bearer " + token}}
            ).then(async response => {
                //Create the playlist
                await Axios.post(
                    `https://api.spotify.com/v1/users/${response.data.id}/playlists`,
                    {'name' : 'Spotify Party', 'description' : 'This playlist was made ' +
                            'automatically by spotify house party'},
                    {headers: authHeader}
                ).then(response => {
                    playlist = response.data;
                });
            });
        }

        //TODO: need to add in more error checking for the api calls...
        //Return true if there were no breaking errors :)
        return playlist;
}
