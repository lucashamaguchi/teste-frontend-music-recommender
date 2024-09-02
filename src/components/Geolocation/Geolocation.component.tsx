import React from "react";
import Button from "@mui/material/Button";
import { ICityProperties } from "../CityInput/CityInput.component";
import getCityFromCoordinates from "../../services/getCityFromCoordinates";

export interface IGeolocationProps {
  onSelect: (cityProperties: ICityProperties) => void;
}

function GeolocationComponent(props: Readonly<IGeolocationProps>) {
  const getCoords = (): Promise<{
    longitude: number | null;
    latitude: number | null;
  }> => {
    return new Promise((resolve, reject) => {
      const location = window.navigator.geolocation;

      if (location) {
        location.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          function (error) {
            resolve({ latitude: null, longitude: null });
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const getGeolocationClick = async () => {
    props.onSelect({});
    const coords = await getCoords();
    const resp = await getCityFromCoordinates({
      lat: coords.latitude,
      lng: coords.longitude,
    });
    const cityName = resp[0].name;
    props.onSelect({
      name: cityName,
      coords: { lat: coords.latitude, lng: coords.longitude },
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={getGeolocationClick}>
        Get Geolocation
      </Button>
    </div>
  );
}

export default GeolocationComponent;
