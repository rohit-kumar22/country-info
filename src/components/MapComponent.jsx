import React, { useEffect, useState, useCallback, useContext } from "react";
import { locationContext } from "../context/locationContext";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Data,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vh",
  height: "90vh",
};

const center = {
  lat: 32.885353,
  lng: 13.180161,
};

const zoomValue = 2;

function MapComponent() {
  const { location, setLocation } = useContext(locationContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const getcord = (lati, long) => {
    fetch(
      `http://api.geonames.org/countryCodeJSON?lat=${lati}&lng=${long}&username=${
        import.meta.env.VITE_COORDINATES_TO_COUNTRY_KEY
      }`
    )
      .then((response) => response.json())

      .then((data) => {
        setLocation({ lat: lati, lng: long, country: data.countryName });
      });
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomValue}
          onClick={(ev) => {
            getcord(ev.latLng.lat(), ev.latLng.lng());
          }}>
          <Marker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
          />
        </GoogleMap>
      ) : (
        <>
          <p>Loading.....</p>
        </>
      )}
    </>
  );
}

export default React.memo(MapComponent);
