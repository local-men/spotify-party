import React from 'react';
import './App.css';
import Axios from 'axios';

import CurrentlyPlayingWindowComponent from "./components/currentlyPlayingWindow/currentlyPlayingWindow";
import SearchWindowComponent from './components/searchWindow/searchWindow';
import QueueWindowComponent from "./components/queueWindow/queueWindow";

import LoginCallBack from './spotify/LoginCallback';
import InitQueuePlaylist from "./spotify/InitQueuePlaylist";

import IntroScreen from './screens/IntroScreen';

window.onSpotifyWebPlaybackSDKReady = () => {};

require('dotenv').config();

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            playerReady: false,
            item: {
                album: {
                  images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms:0,
            },
            is_playing: "Paused",
            progress_ms: 0,
            // previousSong: "spotify:track:2GGMabyHXnJmjY6CXhhB2e", /* money cardi b*/
            // currentSong: "spotify:track:2e3g8go386Zn6EyIz60Ci9",  /* snake eater */
            // nextSong: "spotify:track:7sO5G9EABYOXQKNPNiE9NR",  /* ric flair drip */
            // lastSong: "spotify:track:3qN5qMTKyEEmiTZD38BNTT"    /* i'm upset drake */,
            // songQueue: ["spotify:track:2GGMabyHXnJmjY6CXhhB2e", "spotify:track:2e3g8go386Zn6EyIz60Ci9", "spotify:track:7sO5G9EABYOXQKNPNiE9NR"],

            currentUserRole: 'admin',

            songQueue: [],

            //User sesssion creds
            userDeviceId: null,
            token: null,

            //Player State
            playerLoaded: false,
            playerSelected: false,
            playerState: null,

            //Playlist State
            playlistReady: false,
            playlistId: null,
        };
    }

    componentDidMount() {
        LoginCallBack({
            onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
            onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
        })
    }

    /**The function is for when the user is successfully authorized**/
    async onSuccessfulAuthorization(token){
        //Set token, and init playlist
        await this.setState({
            token: token,
            playlistId: await InitQueuePlaylist(token)
        });
        //If initing the playlist and assigning the playlist id works...
        if(this.state.playlistId){
            console.log('playlist was initd mon: ', this.state.playlistId);
        };
    }

    /** This function is called when the access token expires, it resets state vars**/
    onAccessTokenExpiration(){
        this.setState({
            userDeviceId: null,
            token: null,
            playerLoaded: false,
            playerSelected: false,
            playerState: null
        });

        console.error('The user access token has expired.');
    }

    // async initQueuePlaylist(){
    //     // //Does the playlist already exist
    //     // let playlist = null;
    //     // let token = this.state.token;
    //     // let authHeader = {"Authorization" : "Bearer " + token};
    //     //
    //     // //Search through playlists for one with name "spotify party"
    //     // await Axios.get(
    //     //     'https://api.spotify.com/v1/me/playlists',
    //     //     {headers: authHeader}
    //     //     ).then(function (response){
    //     //         response.data.items.forEach(function(userPlaylist){
    //     //         if(userPlaylist.name === "Spotify Party"){
    //     //             playlist = userPlaylist;
    //     //         }
    //     //     })
    //     // });
    //     //
    //     // console.log("THE PLAYLIST", playlist);
    //     //
    //     // //If playlist already exist
    //     // if(playlist){
    //     //     //If the playlist has tracks
    //     //     if(playlist.tracks.total !== 0){
    //     //         console.log('PLAYLIST EXISTS AND HAS TRACKS!');
    //     //         //Get the tracks that belong to the playlist
    //     //         Axios.get(
    //     //             `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
    //     //             {headers: authHeader}
    //     //         ).then(response => {
    //     //             //Run through response tracks and create an array of URI's
    //     //             let uriArray = response.data.items.map(item => {
    //     //                 return {"uri" : item.track.uri}
    //     //             });
    //     //
    //     //             //Remove tracks from playlist
    //     //             Axios.delete(
    //     //                 `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
    //     //                 {headers: authHeader,
    //     //                         data: {"tracks" : uriArray}},
    //     //             )
    //     //         });
    //     //     }
    //     // } else{
    //     //     //Get current user ID
    //     //     Axios.get(
    //     //         'https://api.spotify.com/v1/me',
    //     //         { headers : {"Authorization" : "Bearer " + token}}
    //     //     ).then(response => {
    //     //
    //     //         Axios.post(
    //     //             `https://api.spotify.com/v1/users/${response.data.id}/playlists`,
    //     //             {'name' : 'Spotify Party', 'description' : 'This playlist was made ' +
    //     //                     'automatically by spotify house party'},
    //     //             {headers: authHeader}
    //     //         );
    //     //     });
    //     //
    //     //     //Create the playlist
    //     //     console.log("PLAYLIST DOESNT EXIST");
    //     // }
    //     // //If that doesn't exist then create one
    // }

    //Do some logic to add a song to the queue
    queueSong = async (songUri, songTitle, artistName, imageSrc) => {
        await this.setState({songQueue: this.state.songQueue.concat({
                songUri: songUri,
                songTitle: songTitle,
                artistName: artistName,
                imageSrc: imageSrc,
                votes: 1,
            }),
        });
        console.log('This is the song queue!!!', this.state.songQueue);
    };

    changeUri(){

    }

    render() {
        let{
            userDeviceId,
            token,
            playerLoaded,
            playerSelected,
            playerState
        } = this.state;

        //Init web player sdk props
        let webPlaybackSdkProps = {
            playerName: "Spotify Party Player",
            playerInitialVolume: 0.2,
            playerRefreshRate: 100,
            playerAutoConnect: true,
            onPlayerRequestAccessToken: (() => token),
            onPlayerLoading: (() => this.setState({playerLoaded: true})),
            onPlayerWaitingForDevice: (({device_id}) => this.setState({playerSelected: false, userDeviceId: device_id})),
            onPlayerDeviceSelected: (() => this.setState({playerSelected: true})),
            onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
            onPlayerError: (playerError => console.error(playerError))
        };

        return (
            <div className="App">
              <div className={"App-Container"}>
                {this.state.token ?
                    <div>
                      <SearchWindowComponent
                        token={this.state.token}
                        queueSong={this.queueSong}
                      />
                      <QueueWindowComponent
                        songQueue={this.state.songQueue}
                      />
                      <CurrentlyPlayingWindowComponent
                          token={this.state.token}
                          playerSelected={this.state.playerSelected}
                          webPlaybackSdkProps={webPlaybackSdkProps}
                          changeUri={this.changeUri()}
                          playerState={playerState}
                      />
                    </div>
                    : null}
                  {!this.state.token && <IntroScreen /> }
              </div>
            </div>
        );
    }
}

export default App;
