import React from "react";
import '../App.css';
import Axios from 'axios';

import CurrentlyPlayingWindowComponent from "./components/body/currentlyPlayingWindow/currentlyPlayingWindow";
import SearchWindowComponent from './components/body/searchWindow/searchWindow';
import QueueWindowComponent from "./components/body/queueWindow/queueWindow";
import LoginCallBack from './spotify/LoginCallback';
import HandleQueueUpdates from "./spotify/HandleQueueUpdates";
import IntroScreen from './screens/IntroScreen';
import {connect} from 'react-redux'
import {
    loginAction,
    playerLoadedAction,
} from "./redux/actions";

window.onSpotifyWebPlaybackSDKReady = () => {
};

require('dotenv').config();

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginReducer.loggedIn,
        playerLoaded: state.musicPlayerReducer.playerLoaded,
        token: state.loginReducer.token,
        currentUserRole: state.loginReducer.currentUserRole,
    };
};
const mapDispatchToProps = {
    loginAction,
    playerLoadedAction,
};

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

            songQueue: [],
            tempUris: [],
            lastSongPlayed: '',

            //User sesssion creds
            userDeviceId: null,

            //Player State
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
        this.props.loginAction({token: token, loggedIn: true, currentUserRole: "Legend"});
    }

    /** This function is called when the access token expires, it resets state vars**/
    onAccessTokenExpiration() {
        this.props.loginAction({token: null, loggedIn: false, currentUserRole: "Pleb"});
        this.setState({
            userDeviceId: null,
            playerSelected: false,
            playerState: null,
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
    };

    /** This function starts or resumes a users playback depending on what it currently is**/
    playOrPause = (paused) => {
        Axios.put(
            `https://api.spotify.com/v1/me/player/${paused ? "play" : "pause"}`,
            null,
            {headers: {'Authorization': 'Bearer ' + this.state.token}}
        );
        // console.log("APP.js paused = ", paused);
    };
    //TODO: fix this shit
    endOfSong = async () => {
        const {token, songQueue} = this.props;
        //If end of song trigger hasn't been fired yet
        if (!endOfSongTriggered) {
            endOfSongTriggered = true;
            // console.log('action before...');
            await HandleQueueUpdates.endOfSong(token, songQueue);
            // console.log('action after...');
            let self = this;
            let waiting = setInterval(async () => {
                if (await HandleQueueUpdates.waitForFinish(token,songQueue[0].songUri)) {
                    // console.log("zzzzzzzzzzzzzzzzz Eventually triggered this...");
                    await this.setState({
                        songQueue: songQueue.slice(1),
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
        const {
            token,
            playerLoadedAction,
        } = this.props;
        const {
            songQueue,
            playerState,
            playerSelected,
        } = this.state;

        //Init web player sdk props
        let webPlaybackSdkProps = {
            playerName: "Spotify Party Player",
            playerInitialVolume: 0.2,
            playerRefreshRate: 100,
            playerAutoConnect: true,
            onPlayerRequestAccessToken: (() => token),
            onPlayerLoading: (() => playerLoadedAction({playerLoaded: true})),
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
                {token ?
                    <div>
                        <SearchWindowComponent
                            token={token}
                            queueSong={this.queueSong}
                        />
                        <QueueWindowComponent
                            songQueue={songQueue}
                        />
                        <CurrentlyPlayingWindowComponent
                            token={token}
                            playerSelected={playerSelected}
                            webPlaybackSdkProps={webPlaybackSdkProps}
                            playerState={playerState}
                            playOrPause={this.playOrPause}
                            endOfSong={this.endOfSong}
                        />
                    </div>
                    :
                    <IntroScreen/>}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyParty);