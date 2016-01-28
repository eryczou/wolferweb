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
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {

    let { statusText, isFetching, data } = this.props;
    let { fetchClusterDocData } = this.props;

    let fakeDatas = [
      {
        title: 'American Politics',
        items: [
          {doc: 'article1',
            keywords: 'american'},
          {doc: 'article2',
            keywords: 'china'}
        ]
      },
      {
        title: 'Animal World',
        items: [
          {doc: 'animal1',
            keywords: 'monkey'},
          {doc: 'animal2',
            keywords: 'cat'},
          {doc: 'animal3',
            keywords: 'elephant'}
        ]
      }
    ]

    return (
      <div>
        <h3 className={classes.clusterDocTitle} >{ statusText }</h3>
        <button className='btn btn-primary' onClick= { () => fetchClusterDocData() }> Fetch Cluster Doc Data</button>
        {fakeDatas.map(
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
    data: state.clusterDoc.data
  }
}

export default connect(mapStateToProps, clusterDocActions)(ClusterDoc)
