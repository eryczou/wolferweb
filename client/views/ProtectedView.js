import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as authActions } from '../redux/modules/auth';

export class ProtectedView extends React.Component {

  static propTypes = {
    userName: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    fetchProtectedData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  constructor(props){
    super(props)
    this.fetchData.bind(this)
  }

  componentWillMount () {
    this.fetchData();
  }

  fetchData () {
    let token = this.props.token;
    this.props.fetchProtectedData(token);
  }

  render () {
    return (
      <div>
        {this.props.isFetching === true
          ? <h1>Loading data...</h1>
          : <div>
          <h1>Welcome back,
            {this.props.userName}!</h1>
          <h3>{this.props.data? this.props.data : ''}</h3>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching
});

export default connect(mapStateToProps, authActions)(ProtectedView);
