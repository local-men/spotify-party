import {initialAuthState} from "../initialState";

const loginReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                userDeviceId: action.payload.userDeviceId,
                token: action.payload.token,
            };
        default:
            return state;
    }
};
export default loginReducer;