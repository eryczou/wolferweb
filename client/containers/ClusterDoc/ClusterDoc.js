import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as clusterDocActions } from '../../redux/modules/clusterDoc'
import ListBlock from '../../components/ListBlock/ListBlock'
import classes from './ClusterDoc.scss'

class ClusterDoc extends React.Component {

  static propTypes = {
    fetchClusterDocData: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    statusText: PropTypes.string.isRequired,
    docData: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props)
  }

  render() {

    let { statusText, isFetching, docData } = this.props
    let { fetchClusterDocData } = this.props

    return (
      <div>
        <h3 className={classes.clusterDocTitle} >{statusText}</h3>
        <button className='btn btn-primary' onClick= {() => fetchClusterDocData()}> Fetch Cluster Doc Data</button>
        {docData.map(
          (data, index) =>
            <ListBlock key={index} title={data.title} items={data.items} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.clusterDoc.isFetching,
    statusText: state.clusterDoc.statusText,
    docData: state.clusterDoc.docData
  }
}

export default connect(mapStateToProps, clusterDocActions)(ClusterDoc)
