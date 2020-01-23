import React from "react";
import '../App.css';
import Axios from 'axios';

import CurrentlyPlayingWindowComponent from "./components/body/currentlyPlayingWindow/currentlyPlayingWindow";
import SearchWindowComponent from './components/body/searchWindow/searchWindow';
import QueueWindowComponent from "./components/body/queueWindow/queueWindow";

import LoginCallBack from './spotify/LoginCallback';
import HandleQueueUpdates from "./spotify/HandleQueueUpdates";

import IntroScreen from './screens/IntroScreen';

window.onSpotifyWebPlaybackSDKReady = () => {
};

require('dotenv').config();

let endOfSongTriggered = false;

class SpotifyParty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerReady: false,
            item: {
                album: {
                    images: [{url: ""}]
                },
                name: "",
                artists: [{name: ""}],
                duration_ms: 0,
            },
            is_playing: "Paused",
            progress_ms: 0,

            currentUserRole: 'admin',

            songQueue: [],
            tempUris: [],
            lastSongPlayed: '',

            //User sesssion creds
            userDeviceId: null,
            token: null,

            //Player State
            playerLoaded: false,
            playerSelected: false,
            playerState: null,
        };
    }

    componentDidMount() {
        LoginCallBack({
            onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
            onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
        })
    }

    /**The function is for when the user is successfully authorized**/
    async onSuccessfulAuthorization(token) {
        //Set token, and init playlist
        await this.setState({
            token: token,
        });
    }

    /** This function is called when the access token expires, it resets state vars**/
    onAccessTokenExpiration() {
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
        await this.setState({
            songQueue: this.state.songQueue.concat({
                songUri: songUri,
                songTitle: songTitle,
                artistName: artistName,
                imageSrc: imageSrc,
                votes: 1,
            }),
        });

        HandleQueueUpdates.addToSongQueue(this.state.token, this.state.songQueue);

        //Need to do this on ending a song call...
        this.setState({lastPlayedSong: this.state.songQueue[0].songUri});

        console.log('This is the song queue!!!', this.state.songQueue);
    };

    /** This function starts or resumes a users playback depending on what it currently is**/
    playOrPause = (paused) => {
        Axios.put(
            `https://api.spotify.com/v1/me/player/${paused ? "play" : "pause"}`,
            null,
            {headers: {'Authorization': 'Bearer ' + this.state.token}}
        );
        console.log("APP.js paused = ", paused);
    };
    //TODO: fix this shit
    endOfSong = async () => {
        //If end of song trigger hasn't been fired yet
        if (!endOfSongTriggered) {
            endOfSongTriggered = true;
            console.log('action before...');
            await HandleQueueUpdates.endOfSong(this.state.token, this.state.songQueue);
            console.log('action after...');
            let self = this;
            let waiting = setInterval(async () => {
                if (await HandleQueueUpdates.waitForFinish(self.state.token, self.state.songQueue[0].songUri)) {
                    console.log("zzzzzzzzzzzzzzzzz Eventually triggered this...");
                    await this.setState({
                        songQueue: this.state.songQueue.slice(1),
                        songQueueTriggered: false
                    });
                    clearInterval(waiting);
                    endOfSongTriggered = false;
                } else {
                    endOfSongTriggered = true;
                }
            }, 500);

        }
    };

    render() {
        let {
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
            onPlayerWaitingForDevice: (({device_id}) => this.setState({
                playerSelected: false,
                userDeviceId: device_id
            })),
            onPlayerDeviceSelected: (() => this.setState({playerSelected: true})),
            onPlayerStateChange: (playerState => this.setState({playerState: playerState})),
            onPlayerError: (playerError => console.error(playerError))
        };
        return (
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
                                playerState={playerState}
                                playOrPause={this.playOrPause}
                                endOfSong={this.endOfSong}
                            />
                        </div>
                        : null}
                    {!this.state.token && <IntroScreen/>}
                </div>
        );
    }

}

export default SpotifyParty;