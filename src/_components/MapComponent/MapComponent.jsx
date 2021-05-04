import React, { useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import {getAddress } from './Geocode';

function MapPosition({ positions, center, selected }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  if (!center) {
    center = { lat: 43.6561, lng: -79.3802 };
  }

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPosition(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function onMarkerSelected(position){
    getAddress(position.lat, position.lng).then(address=>{
      position.description = address;
      setSelectedPosition(position);  
    });
  }

  return (
    <GoogleMap
      key={new Date().getTime()}
      defaultZoom={1}
      defaultCenter={center}
    >
      {positions.map((position) => {
        return (
          <Marker
            key={position.key}
            position={{
              lat: position.lat,
              lng: position.lng,
            }}
            onClick={() => {
              onMarkerSelected(position);
            }}
            icon={{
              url:
                selected == position.key
                  ? "https://img.icons8.com/color/48/000000/map-pin.png"
                  : "https://icons-for-free.com/iconfiles/png/512/location+maker+map+icon-1320166084997417306.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        );
      })}

      {selectedPosition && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPosition(null);
          }}
          position={{
            lat: selectedPosition.lat,
            lng: selectedPosition.lng,
          }}
        >
          <div>
            <h5>{selectedPosition.title}</h5>
            <p>{selectedPosition.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MapPosition));

/* 
example: 
  const positions = [{
    key:1,
    lat: 43.656132,
    lng: -79.380423,
    title: "test title",
    description: "test description"
  }]
*/
export default function Map({ positions, center, selected }) {
  return (
    <div style={{ width: "30vw", height: "100vh" }}>
      <MapWrapped
        positions={positions}
        center={center}
        selected={selected}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw&v=3.exp&libraries=geometry,drawing,places}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
