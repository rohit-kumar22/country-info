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
    console.log("LatLang", lati, long);
    fetch(
      `http://api.geonames.org/countryCodeJSON?lat=${lati}&lng=${long}&username=${"rohit_kumar22"}`
    )
      .then((response) => response.json())

      .then((data) => {
        console.log("executed", data);
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
          onClick={(ev) => getcord(ev.latLng.lat(), ev.latLng.lng())}>
          <Marker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            onClick={(e) => findValue(e)}
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
