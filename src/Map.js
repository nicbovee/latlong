import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from "react";


export class MapContainer extends React.Component {
    render() {
      return (
        <Map
        google={this.props.google}
        style={{alignSelf: "flex-start", maxWidth: '59%', height: '100%'}}

        zoom={2}
        onClick={this.onMapClicked}
        >
            
        <Marker
            name={this.props.mapObjects[0].name}
            position={{lat: this.props.mapObjects[0].lat, lng: this.props.mapObjects[1].lng}} 
        />
        
        <Marker
            name={this.props.mapObjects[0].name}
            position={{lat: this.props.mapObjects[1].lat, lng: this.props.mapObjects[0].lng}} 
        />

      </Map>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE')
})(MapContainer)