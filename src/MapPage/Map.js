import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const style = {
    width: '600px',
    height: '400px'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLocation: {
            lat: 0,
            lng: 0
        }
    };

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    };

    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    showPosition = (position) => {
        this.setState({
            currentLocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });
    };

    test = (asd, marker) => {
      console.log(marker,"aquí");
    };

    render() {
        const { maps, map } = this.props;
        return (
            <Map
                google={this.props.google}
                zoom={6}
                style={style}
                center={{
                    lat: this.state.currentLocation.lat,
                    lng: this.state.currentLocation.lng
                }}
            >
                {maps.loading && <em>Loading marker...</em>}
                {maps.error && <span className="text-danger">ERROR: {maps.error}</span>}
                {maps.items &&
                maps.items.maps.map((map, index) =>
                    <Marker onClick={this.onMarkerClick}
                            name={new Date(map.date).toLocaleString()}
                            position={{lat: map.lat, lng: map.lng}}
                    />
                )
                }


                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        {this.state.selectedPlace.name}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

function mapsStateToProps(state) {
    const { maps } = state;
    let map = {};
    if (maps.items){
        map = maps.items.map;
    }
    return {
        maps,
        map
    };
}

const connectedMap = connect(mapsStateToProps)(GoogleApiWrapper({
    apiKey: ("AIzaSyCvJ9ax4AKI43iZIWCHa8CAe4EUULoXeic")
})(MapContainer));
export { connectedMap as Map };