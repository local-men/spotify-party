import React, { Component, Fragment } from 'react';
import Axios from 'axios';

export default class WebPlayback extends Component {
    deviceSelectedInterval = null;
    statePollingInterval = null;
    webPlaybackInstance = null;

    state = {
        playerReady: false,
        playerSelected: false,
    };

    /** Function to handle state **/
    async handleState(state) {
        //Setting props so to not directly change?
        let {
            onPlayerStateChange,
            onPlayerWaitingForDevice,
            onPlayerDeviceSelected,
        } = this.props;

        //If state is true / an object ...
        if (state) {
            //Call player state change function, a function passed from props
            onPlayerStateChange(state);
            // console.log('PLAYER STATE CHANGE!', state)
        } else {
            let {
                //Not sure about this,
                _options: { id: device_id }
            } = this.webPlaybackInstance;

            //clear state polling
            this.clearStatePolling();
            onPlayerWaitingForDevice({ device_id });
            await this.waitForDeviceToBeSelected();
            onPlayerDeviceSelected();
        }
    }
    /** This function checks to see if the spotify namespace is in use **/
    waitForSpotify() {
        return new Promise(resolve => {
            //Checks if the Spotify namespace is in the window.
            if ('Spotify' in window) {
                resolve();
            } else {
                //else it assigns resolve to the 'webplaybacksdkready' spotify function, hence when sdk is ready it resolves
                window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
            }
        });
    }

    /** This function checks if web playback instance is true every x seconds, and resolves the function once it is. **/
    waitForDeviceToBeSelected() {
        //Send API Request to spotify to change player to this one :)
        this.connectToDevice();
        return new Promise(resolve => {
            this.deviceSelectedInterval = setInterval(() => {
                if (this.webPlaybackInstance) {
                    this.webPlaybackInstance.getCurrentState().then(state => {
                        if (state !== null) {
                            this.startStatePolling();
                            clearInterval(this.deviceSelectedInterval);
                            resolve(state);
                        }
                    });
                }
            });
        });
    }


    async connectToDevice(){
        let token = await this.props.onPlayerRequestAccessToken();

        //Send put request to spotify to set the spotify party player as current device
        Axios.put(
            'https://api.spotify.com/v1/me/player',
            {"device_ids": [this.webPlaybackInstance._options.id]},
            {headers: {"Authorization": "Bearer " + token}}
        );
    }

    /** Starts state polling, every one second it gets current state, and runs the handle state function again **/
    startStatePolling() {
        this.statePollingInterval = setInterval(async () => {
            let state = await this.webPlaybackInstance.getCurrentState();
            await this.handleState(state);
        }, this.props.playerRefreshRateMs || 1000);
    }

    /** Removes the state polling **/
    clearStatePolling() {
        clearInterval(this.statePollingInterval);
    }

    /**  **/
    async setupWebPlaybackEvents() {
        //connect to the window spotify
        let { Player } = window.Spotify;
        //init player variables
        let {
            playerName,
            playerInitialVolume,
            onPlayerRequestAccessToken,
        } = this.props;

        //Creating new player with props aas vars
        this.webPlaybackInstance = new Player({
            name: playerName,
            volume: playerInitialVolume,
            getOAuthToken: async callback => {
                if (typeof onPlayerRequestAccessToken !== "undefined") {
                    let userAccessToken = await onPlayerRequestAccessToken();
                    callback(userAccessToken);
                }
            }
        });

        //Error checking the player
        this.webPlaybackInstance.on("initialization_error", ({ message }) => {
            this.props.onPlayerError(message);
        });

        this.webPlaybackInstance.on("authentication_error", ({ message }) => {
            this.props.onPlayerError(message);
        });

        this.webPlaybackInstance.on("account_error", ({ message }) => {
            this.props.onPlayerError(message);
        });

        this.webPlaybackInstance.on("playback_error", ({ message }) => {
            this.props.onPlayerError(message);
        });

        this.webPlaybackInstance.on("player_state_changed", async state => {
            await this.handleState(state);
        });

        //When the player is ready
        this.webPlaybackInstance.on("ready", data => {
            //Check waiting for device?
            this.props.onPlayerWaitingForDevice(data);
        });

        //not sure
        if (this.props.playerAutoConnect) {
            this.webPlaybackInstance.connect();
        }
    }

    //Waiting for device to be ready.
    setupWaitingForDevice() {
        return new Promise(resolve => {
            this.webPlaybackInstance.on("ready", data => {
                resolve(data);
            });
        });
    }

    async componentWillMount() {
        let {
            onPlayerLoading,
            onPlayerWaitingForDevice,
            onPlayerDeviceSelected
        } = this.props;

        // Notify the player is loading
        onPlayerLoading();

        // Wait for Spotify to load player
        await this.waitForSpotify();

        // Setup the instance and the callbacks
        await this.setupWebPlaybackEvents();

        // Wait for device to be ready
        let device_data = await this.setupWaitingForDevice();
        onPlayerWaitingForDevice(device_data);

        // Wait for device to be selected
        await this.waitForDeviceToBeSelected();
        onPlayerDeviceSelected();
    }

    render() {
        return (<Fragment>{this.props.children}</Fragment>);
    }
};