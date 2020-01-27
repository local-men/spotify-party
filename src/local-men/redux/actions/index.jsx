export const loginAction = (props) => {
    console.log("got to action");
    return {
        type: 'LOGIN',
        payload: props
    };
};
export const logoutAction = () => dispatch => {
    dispatch({
        type: 'LOGOUT'
    })
};
export const addSongToQueue = (props) => (dispatch) => {
    dispatch({
        type: 'ADD_TO_QUEUE',
        payload: props
    })
}