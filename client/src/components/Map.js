import React, { Component } from 'react';
import GoogleMapComponent from './GoogleMapComponent';
import axios from 'axios';

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: { lat: 51.507506, lng: -0.127819 },
      places: [],
      placeInfoWindow: null
    }
  }

  componentDidMount() {
    console.log("MOUNT")
    this.getData()
  }

  getBounds = (map) => {
    let boundsObjects = map.getBounds()
    // Key for lat
    let boundsLat = Object.keys(boundsObjects)[0]
    // Key for SW lat and NE lat
    let boundsLatKeys = Object.keys(boundsObjects[boundsLat])
    // Values for SW lat and NE lat
    let swLat = boundsObjects[boundsLat][boundsLatKeys[0]]
    let neLat = boundsObjects[boundsLat][boundsLatKeys[1]]
    // Key for lng
    let boundsLng = Object.keys(boundsObjects)[1]
    // Key for SW lng and NE lng
    let boundsLngKeys = Object.keys(boundsObjects[boundsLng])
    // Values for SW lng and NE lng
    let swLng = boundsObjects[boundsLng][boundsLngKeys[0]]
    let neLng = boundsObjects[boundsLng][boundsLngKeys[1]]
    let bounds = `${swLat}|${swLng}|${neLat}|${neLng}`
    return bounds
  }

  getData = () => {
    axios.get('/api/v1/places')
    .then(response => {
      this.setState({ places: response.data.places })
    })
    .catch(error => console.log(error))
  }

  handleMapChange = () => {
    console.log(this.getBounds(this.map))
  }

  handleMapMounted = (m) => {
    this.map = m;
  }

  handlePlaceClick = (id) => {
    this.setState({ placeInfoWindow: id })
  }

  render () {
    return (
      <div>
        <GoogleMapComponent
          center={this.state.mapCenter}
          onMapMounted={this.handleMapMounted}
          onPlaceClick={this.handlePlaceClick}
          onDragEnd={this.handleMapChange}
          onZoomChanged={this.handleMapChange}
          places={this.state.places}
          placeInfoWindow={this.state.placeInfoWindow}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
          containerElement={<div style={{ height: `100vh` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default Map
