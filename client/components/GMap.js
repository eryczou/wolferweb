import React from 'react';
import ReactDOM from 'react-dom';

class GMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: this.props.initialZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      map = new google.maps.Map(this.gMapWrapper, mapOptions);
    var marker = new google.maps.Marker({position: this.mapMarkLatLng(), title: 'Hi', map: map});
    this.setState({map: map});
  }

  render() {
    return (
      <div className="wfx-gMap wfx-effect-boxShadow">
        <div className="wfx-gMap-wrapper" ref={(ref) => this.gMapWrapper = ref}>
        </div>
      </div>
    );
  }

  mapCenterLatLng() {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  }

  mapMarkLatLng() {
    var props = this.props;
    return new google.maps.LatLng(props.mapMarkLat, props.mapMarkLng);
  }
}

GMap.defaultProps = {
  initialZoom: 16,
  mapCenterLat: 30.284078,
  mapCenterLng: -89.747277,
  mapMarkLat: 30.284078,
  mapMarkLng: -89.746104
}

export default GMap;