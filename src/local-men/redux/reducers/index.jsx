import { combineReducers } from 'redux';
import loginReducer from "./login";
import musicPlayerReducer from "./musicPlayer";

const rootReducer = combineReducers({
    loginReducer,
    musicPlayerReducer,
});
export default rootReducer;
