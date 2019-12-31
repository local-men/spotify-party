import React from 'react';
import './App.css';
import Axios from 'axios';

import SpotifyAPI from 'spotify-web-api-js';

import CurrentlyPlayingWindowComponent from "./components/currentlyPlayingWindow/currentlyPlayingWindow";
import SearchWindowComponent from './components/searchWindow/searchWindow';
import QueueWindowComponent from "./components/queueWindow/queueWindow";


export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "a64f28e8cae642d1bd0cc9d12410b1dd";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-library-modify",
  "streaming",

];

// "app-remote-control",

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
window.location.hash = "";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      // this.instantiatePlayer(_token);
    }

  }

  getCurrentlyPlaying(token) {
    var self = this;
    // Make a call using the token
    Axios.get('https://api.spotify.com/v1/me/player', {headers: {"Authorization": "Bearer " + token}})
        .then(function (response){
          console.log("data", response.data);
          self.setState({
            item: response.data.item,
            is_playing: response.data.is_playing,
            progress_ms: response.data.progress_ms,
          });
        });
  }

  render() {

    return (
        <div className="App">

          <div className={"App-Container"}>
            {!this.state.token && (
                <a
                    className="btn btn--loginApp-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
            )}
            {this.state.token ?
                <div>
                  <SearchWindowComponent
                    token={this.state.token}
                  />
                  <QueueWindowComponent/>
                  <CurrentlyPlayingWindowComponent
                      token={this.state.token}
                  />
                </div>
                : null}
          </div>
        </div>
    );
  }
}

export default App;