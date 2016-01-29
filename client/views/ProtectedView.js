import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as authActions } from '../redux/modules/auth';

export class ProtectedView extends React.Component {

  constructor(props){
    super(props)
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };


  render () {
    return (
      <div>
        Hello
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching
});

export default connect(mapStateToProps)(ProtectedView);
