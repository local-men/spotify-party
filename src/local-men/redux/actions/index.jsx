export const loginAction = (props) => (dispatch) => {
    dispatch({
        type: 'LOGIN',
        payload: props
    })
};
export const playerLoadedAction = (props) => (dispatch) => {
    dispatch({
        type: 'PLAYER_LOADED',
        payload: props
    })
};

