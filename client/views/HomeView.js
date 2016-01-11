import React from 'react';
import Blog from '../components/Blog';

class HomeView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Blog />
      </div>
    );
  }
}

export default HomeView;
