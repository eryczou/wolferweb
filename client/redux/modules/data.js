import { handleActions } from 'redux-actions'
import { RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST } from './auth';
import jwtDecode from 'jwt-decode';

const initialState = {
    data: '',
    username:'',
    isFetching: false
};

export default handleActions({
    [RECEIVE_PROTECTED_DATA]: (state, action) => {
        return Object.assign({}, state, {
            'data': action.payload.data,
            'isFetching': false
        });
    },
    [FETCH_PROTECTED_DATA_REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    }
}, initialState);
