import React from 'react';
import {Link} from 'react-router';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // bootstrap carousel
    return (
      <div className={this.props.className}>
        <div id="wfx-carousel" className="wfx-carousel carousel slide" data-ride="carousel">
          {/* Indicators */}
          <ol className="carousel-indicators">
            <li data-target="#wfx-carousel" data-slide-to="0" className="active"></li>
            <li data-target="#wfx-carousel" data-slide-to="1"></li>
            <li data-target="#wfx-carousel" data-slide-to="2"></li>
            <li data-target="#wfx-carousel" data-slide-to="3"></li>
            <li data-target="#wfx-carousel" data-slide-to="4"></li>
            <li data-target="#wfx-carousel" data-slide-to="5"></li>
          </ol>

          {/* Wrapper for slides */}
          <div className="carousel-inner" role="listbox">
            <div className="wfx-carousel-item item active">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_outside_2.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
            <div className="wfx-carousel-item item">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_outside.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
            <div className="wfx-carousel-item item">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_single_room.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
            <div className="wfx-carousel-item item">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_king_size_bed.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
            <div className="wfx-carousel-item item">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_double_room.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
            <div className="wfx-carousel-item item">
              <img className="wfx-carousel-img" src="/img/components/carousel/value_inn_double_room_2.jpg" />
              <div className="carousel-caption">
                <h4>Welcome to Value Travel Inn</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;