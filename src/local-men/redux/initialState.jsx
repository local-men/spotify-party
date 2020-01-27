export const initialAuthState = {
    loggedIn: false,
    token: null,
    userDeviceId: 0,
    playerLoaded: false,
    playerSelected: false,
    playerState: null,
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
    tempUris: [],
    lastSongPlayed: '',
};

export const initialMusicState = {
    songQueue: [],
};
