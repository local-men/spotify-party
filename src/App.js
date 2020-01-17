import React from 'react';
import './App.css';
import Axios from 'axios';

import CurrentlyPlayingWindowComponent from "./components/currentlyPlayingWindow/currentlyPlayingWindow";
import SearchWindowComponent from './components/searchWindow/searchWindow';
import QueueWindowComponent from "./components/queueWindow/queueWindow";

import LoginCallBack from './spotify/LoginCallback';

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
            playerState: null
        };
    }

    componentDidMount() {

        // window.onSpotifyWebPlaybackSDKReady = () =>{
        //   this.setState({
        //       playerReady: true
        //   })
        // };
        // // Set token
        // let _token = hash.access_token;
        // if (_token) {
        //     // Set token
        //     this.setState({
        //         token: _token
        //     });
        //     this.getCurrentlyPlaying(_token);
        //     // this.instantiatePlayer(_token);
        // }
        // console.log('aadsada')

        LoginCallBack({
            onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
            onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
        })
    }

    //
    async onSuccessfulAuthorization(token){
        await this.setState({token: token});
        this.initQueuePlaylist();
    }

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

    async initQueuePlaylist(){
        //Does the playlist already exist
        let alreadyExist = false;
        let playlist = null;
        let playlistId = "";

        //Search through playlists for one with name "spotify party"
        await Axios.get(
            'https://api.spotify.com/v1/me/playlists',
            {headers: {"Authorization" : "Bearer " + this.state.token}}
            ).then(function (response){
                response.data.items.forEach(function(userPlaylist){
                console.log(playlist);
                if(userPlaylist.name === "Spotify Party"){
                    playlist = userPlaylist;
                }
            })
        });

        console.log("THE PLAYLIST", playlist);

        //If playlist already exist... && has tracks
        if(playlist && playlist.tracks.total !== 0){
            //TODO: GET THIS api call working, currently isn't removing tracks from playlist :(
            //Clear the playlist
            console.log("PLAYLIST EXIST");
            Axios.put(
                `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
                {"uris": "", "range_start": 0, "insert_before": 0, "range_length": playlist.tracks.total},
                {headers: {"Authorization" : "Bearer " + this.state.token}}
            )
        } else{
            //Create the playlist
            console.log("PLAYLIST DOESNT EXIST");
        }

        //If that doesn't exist then create one
    }


    // //Get's the currently playing song (remove this?)
    // getCurrentlyPlaying(token) {
    //     var self = this;
    //     // Make a call using the token
    //     Axios.get('https://api.spotify.com/v1/me/player', {headers: {"Authorization": "Bearer " + token}})
    //         .then(function (response){
    //           console.log("data", response.data);
    //           self.setState({
    //             item: response.data.item,
    //             is_playing: response.data.is_playing,
    //             progress_ms: response.data.progress_ms,
    //           });
    //         });
    //
    // };

    //Do some logic to add a song to the queue
    queueSong = async (songUri, songTitle, artistName, imageSrc) => {
        //TODO: add a song to the queue component
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
            playerInitialVolume: 1.0,
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
                {!this.state.token && <IntroScreen /> }
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
              </div>
            </div>
        );
    }
}

export default App;
