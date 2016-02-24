import React from 'react'
import { connect } from 'react-redux'
import MDRender from '../components/MarkDownRender/MarkDownRender'
import SimpleMDE from '../containers/MarkDownEditor/MarkDownEditor'


class HomeView extends React.Component {

  render() {

    const { mdContent } = this.props

    return (
      <div>
        <MDRender mdContent={mdContent} />
        <SimpleMDE />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mdContent: state.mde.mdContent
  }
}

export default connect(mapStateToProps)(HomeView)
