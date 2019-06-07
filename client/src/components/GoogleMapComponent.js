import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from "react-google-maps";
import museumMarker from '../assets/img/museum-icon.png';

const GoogleMapComponent = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    center={props.center}
    defaultOptions={{
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: true,
    }}
    defaultZoom={13}
    onDragEnd={props.onDragEnd}
    onZoomChanged={props.onZoomChanged}
    ref={props.onMapMounted}
  >
    {
      props.places &&
      props.places.map(place => (
        <Marker
          icon={museumMarker}
          key={place.id}
          position={{ lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) }}
          onClick={props.onPlaceClick.bind(this, place.id)}
        >
        {
          props.placeInfoWindow === place.id &&
          <InfoWindow>
            <div className="poi-info-window">
              <div>{place.name}</div>
              <div>{place.address}</div>
            </div>
          </InfoWindow>
        }
        </Marker>
      ))
    }
  </GoogleMap>
))

export default GoogleMapComponent;
