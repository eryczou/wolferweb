import { handleActions } from 'redux-actions'
import { checkHttpStatus, parseJSON } from '../../utils/webUtils';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_CLUSTERED_DOC_DATA = 'GETTING_CLUSTERED_DOC_DATA'
export const RECEIVED_CLUSTERED_DOC_DATA = 'RECEIVED_CLUSTERED_DOC_DATA'
export const FAILED_CLUSTERED_DOC_DATA = 'FAILED_CLUSTERED_DOC_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchingClusterDocData = () => {
  return {
    type: FETCHING_CLUSTERED_DOC_DATA
  }
}

export const receivedClusterDocData = (data) => {
  return {
    type: RECEIVED_CLUSTERED_DOC_DATA,
    payload: {
      data: data
    }
  }
}

export const failedClusterDocData = (error) =>  {
  return {
    type: FAILED_CLUSTERED_DOC_DATA,
    error: error
  }
}

export const fetchClusterDocData = () => {
  return (dispatch, state) => {
    dispatch(fetchingClusterDocData());
    return fetch(__PYTHON_API_URL__ + '/clusterdoc')
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(receivedClusterDocData(response.payload))
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
  docData: []
}

export default handleActions({
  [FETCHING_CLUSTERED_DOC_DATA]: (state, action) => {
    return Object.assign({}, state, {
      'isFetching': true,
      'statusText': 'Fetching Cluster Doc Data'
    });
  },
  [RECEIVED_CLUSTERED_DOC_DATA]: (state, { payload }) => {
    console.log(payload.data)
    return Object.assign({}, state, {
      'isFetching': false,
      docData: payload.data,
      'statusText': 'Successfully Received Data'
    });

  },
  [FAILED_CLUSTERED_DOC_DATA]: (state, action) => {
    return Object.assign({}, state, {
      'isFetching': false,
      docData: [],
      'statusText': `Failed when fetch clustered doc data, due to ${action.error}`
    });
  }
}, initialState)
