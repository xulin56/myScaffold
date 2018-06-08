import {handleActions} from 'redux-actions';
// console.dir(handleActions);
export const good = handleActions({
    REQUEST_GOODS: (state, action) => ({
        ...state,
        isFetching: true
    }),
    RECEIVE_GOODS: (state, action) => ({
        ...state,
        isFetching: false,
        data: action.payload
    })
}, {
    isFetching: false,
    data: []
});
