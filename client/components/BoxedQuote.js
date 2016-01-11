import React from 'react';
import {Link} from 'react-router';

class BoxedQuote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-boxedQuote">
        <div className="wfx-boxedQuote-innerBox">
          <blockquote className="wfx-boxedQuote-quoteBlock">
            <p className="wfx-quotation-mainText">"Value Travel Inn will be your warm home on your way of travelling."</p>
            <footer>Jay Wang, <cite title="Source Title">Owner & Manager</cite></footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

export default BoxedQuote;