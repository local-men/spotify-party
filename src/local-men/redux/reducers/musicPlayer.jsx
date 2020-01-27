import {initialMusicState} from '../initialState'

const musicPlayerReducer = (state = initialMusicState, action) => {
    switch (action.type) {
        case "PLAY":
            return state + 1;
        case "PAUSE":
            return state = false;
        case "ADD_TO_QUEUE":
            return{
                ...state,
                songQueue: state.songQueue.concat({
                    songUri: action.payload.songUri,
                    songTitle: action.payload.songTitle,
                    artistName: action.payload.artistName,
                    imageSrc: action.payload.imageSrc,
                    votes: 1,
                })
            };
        default:
            return state;
    }
};
export default musicPlayerReducer;