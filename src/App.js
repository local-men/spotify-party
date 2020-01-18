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
            queuePlaylist: null,
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
            queuePlaylist: await InitQueuePlaylist(token)
        });
        //If the playlist was successfully initiated...
        if(this.state.queuePlaylist){
            let queuePlaylist = this.state.queuePlaylist;
            let playlistStarted = false;
            //create set interval function that checks size of playlist, if it equals or is larger then one... then play the playlist...
            setInterval( async function(){
                //Check the playlist for tracks...
                await Axios.get(
                    `https://api.spotify.com/v1/playlists/${queuePlaylist.id}`,
                    { headers : { "Authorization" : "Bearer " + token}}
                ).then (async response => {
                    console.log("GETTING PLAYLIST BLA BLA: ",response.data.tracks.total);
                    if(response.data.tracks.total >= 1){
                        //If the playlist hasn't been started yet...
                        await Axios.put(
                        `https://api.spotify.com/v1/me/player/play`,
                        {'context_uri' : response.data.uri},
                        {headers: {'Authorization' : "Bearer " + token}}
                        ).then(response => {
                            console.log('RESPONSE FOR PLAYLIST START! ', response);

                        })
                    }
                })
            }, 1000);
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

    /** This function adds a song to the song queue **/
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

        //Adding song to playlist in Spotify
        if(this.state.queuePlaylist){
            await Axios.post(
                `https://api.spotify.com/v1/playlists/${this.state.queuePlaylist.id}/tracks`,
                {'uris' : [songUri]},
                {headers: {"Authorization" : "Bearer " + this.state.token}}
            )
        }
    };

    changeUri(){

    }

    /** This function starts or resumes a users playback depending on what it currently is**/
    playOrPause = (paused) =>{
        Axios.put(
            `https://api.spotify.com/v1/me/player/${paused ? "play" : "pause"}`,
            null,
            {headers: {'Authorization' : 'Bearer ' + this.state.token}}
        );
        console.log("APP.js paused = ", paused);
    };

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
                          playOrPause={this.playOrPause}
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
