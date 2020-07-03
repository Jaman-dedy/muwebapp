/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';

import './Map.scss';
import getPhoneNumberCode from 'utils/getPhoneNumberCode';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props);
    const { center } = this.props;
    this.state = {
      mapPosition: {
        lat: center.lat,
        lng: center.lng,
      },
      markerPosition: {
        lat: center.lat,
        lng: center.lng,
      },
    };
  }

  /**
   * Component should only update ( meaning re-render ), when the user selects a place
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { mapPosition } = this.state;
    const { center } = this.props;
    if (mapPosition.lat !== nextState.mapPosition.lat) {
      return true;
    }
    if (center.lat === nextProps.center.lat) {
      return false;
    }
    return false;
  }

  componentDidMount() {
    const {
      addStoreData: { Longitude, Latitude },
    } = this.props;
    if (Latitude && Longitude) {
      this.setState({
        mapPosition: {
          lat: Number(Latitude),
          lng: Number(Longitude),
        },
        markerPosition: {
          lat: Number(Latitude),
          lng: Number(Longitude),
        },
      });
    } else this.getLocation();
  }

  getLocation = () => {
    const { onChange } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          const { latitude, longitude } = res.coords;
          onChange({
            position: {
              lat: latitude,
              lng: longitude,
            },
          });
          this.setState({
            mapPosition: {
              lat: latitude,
              lng: longitude,
            },
            markerPosition: {
              lat: latitude,
              lng: longitude,
            },
          });
        },
        () => {
          this.setState({
            mapPosition: {
              lat: 0,
              lng: 0,
            },
            markerPosition: {
              lat: 0,
              lng: 0,
            },
          });
        },
      );
    }
    return { latitude: 0, longitude: 0 };
  };

  getLocationInfo = (newLat, newLng) => {
    const { handleInputChange, onChange } = this.props;

    Geocode.fromLatLng(newLat, newLng).then(response => {
      const { results } = response;
      const CountryCode =
        results[results.length - 1].address_components[0].short_name;
      const City =
        results[results.length - 2].address_components[0].long_name;
      const Address = results[0].formatted_address;
      const PhoneNumberCode = getPhoneNumberCode(
        CountryCode.toLowerCase(),
      );

      handleInputChange({
        target: {
          name: 'Address',
          value: Address,
          Longitude: newLng,
          Latitude: newLat,
        },
      });
      onChange({
        position: {
          lat: newLat,
          lng: newLng,
          CountryCode,
          City,
          PhoneNumberCode,
        },
      });
    });
  };

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = event => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    this.getLocationInfo(newLat, newLng);

    this.setState({
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
    });
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = place => {
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();
    this.getLocationInfo(latValue, lngValue);

    this.setState({
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const { google, zoom, center, height } = this.props;
    const { mapPosition, markerPosition } = this.state;
    const AsyncMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap
          google={google}
          defaultZoom={zoom}
          defaultCenter={{
            lat: mapPosition.lat,
            lng: mapPosition.lng,
          }}
        >
          <Marker
            google={google}
            name="Dolores park"
            draggable
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
          />
          <Marker />
          {/* For Auto complete Search Box */}
          <Autocomplete
            className="autocomplete-input"
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
          />
        </GoogleMap>
      )),
    );
    let map;
    if (center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height }} />;
    }
    return map;
  }
}

Map.propTypes = {
  height: PropTypes.string.isRequired,
  center: PropTypes.instanceOf(Object),
  google: PropTypes.instanceOf(PropTypes.any).isRequired,
  zoom: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  addStoreData: PropTypes.instanceOf(Object),
};

Map.defaultProps = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 12,
  handleInputChange: () => null,
  addStoreData: {},
};

export default Map;
