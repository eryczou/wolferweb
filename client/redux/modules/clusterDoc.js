import { handleActions } from 'redux-actions'
import { checkHttpStatus, parseJSON } from '../../utils';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_CLUSTERED_DOC_DATA = 'GETTING_CLUSTERED_DOC_DATA'
export const RECEIVED_CLUSTERED_DOC_DATA = 'RECEIVED_CLUSTERED_DOC_DATA'
export const FAILED_CLUSTERED_DOC_DATA = 'FAILED_CLUSTERED_DOC_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingClusterDocData () {
  return {
    type: FETCHING_CLUSTERED_DOC_DATA
  }
}

export function receivedClusterDocData (data) {
  return {
    type: RECEIVED_CLUSTERED_DOC_DATA,
    payload: {
      data: data
    }
  }
}

export function failedClusterDocData (error)  {
  return {
    type: FAILED_CLUSTERED_DOC_DATA,
    error: error
  }
}

export function fetchClusterDocData() {
  return (dispatch, state) => {
    dispatch(fetchingClusterDocData());
    return fetch(__API_URL__ + '/clusterdoc')
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        console.log(response)
        dispatch(receivedClusterDocData(response.data))
      })
      .catch((error) => {
        dispatch(failedClusterDocData(error))
      })
  }
}

export const actions = {
  fetchClusterDocData,
  fetchingClusterDocData,
  receivedClusterDocData,
  failedClusterDocData
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  statusText: 'Click Button to Fetch Cluster Documentation Data',
  data: {}
}

export default handleActions({
  [FETCHING_CLUSTERED_DOC_DATA]: (state, action) => {
    return Object.assign({}, state, {
      'isFetching': true,
      'statusText': 'Fetching Cluster Doc Data'
    });
  },
  [RECEIVED_CLUSTERED_DOC_DATA]: (state, action) => {
    return Object.assign({}, state, {
      'isFetching': false,
      'statusText': 'Successfully Received Data'
    });

  },
  [FAILED_CLUSTERED_DOC_DATA]: (state, action) => {
    return Object.assign({}, state, {
      'isFetching': false,
      'data': {},
      'statusText': `Failed when fetch clustered doc data, due to ${action.error}`
    });
  }
}, initialState)
