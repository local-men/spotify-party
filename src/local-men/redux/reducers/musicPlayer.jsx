import {initialMusicState} from '../initialState'

const musicPlayerReducer = (state = initialMusicState, action) => {
    switch (action.type) {
        case "PLAYER_LOADED":
            return{
                ...state,
                playerLoaded: action.payload.playerLoaded,
            };
        default:
            return state;
    }
};
export default musicPlayerReducer;