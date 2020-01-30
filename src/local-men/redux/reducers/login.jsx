import {initialAuthState} from "../initialState";

const loginReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                token: action.payload.token,
                currentUserRole: action.payload.currentUserRole,
            };
        default:
            return state;
    }
};
export default loginReducer;