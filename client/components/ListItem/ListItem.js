import React, { PropTypes } from 'react'
import classes from './listItem.scss'

function ListItem ({ item }) {
  return (
    <div className={ classes.listItem }>
      <div>
        {item.doc}
      </div>
      <span className='badge'>
        {item.keywords}
      </span>
    </div>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ListItem
