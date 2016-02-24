import React, { PropTypes } from 'react'
import Remarkable from 'remarkable'

const md = new Remarkable()

class MarkDownRender extends React.Component {

  static propTypes = {
    mdContent: PropTypes.string.isRequired
  }

  render() {

    const { mdContent } = this.props

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: md.render(mdContent)}}>
        </div>
      </div>
    )
  }
}

export default MarkDownRender
