import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ICityProperties } from "../CityInput/CityInput.component";
import getWeatherFromCoords from "../../services/getWeatherFromCoords";
import getSongsFromCoords from "../../services/getSongsFromCoords";
import Box from "@mui/material/Box";

export interface IWeatherStatusProps {
  cityProps: ICityProperties | null;
}

function WeatherStatusComponent(props: IWeatherStatusProps) {
  const [weather, setWeather] = useState<any>(null);
  const [songs, setSongs] = useState<any>([]);
  const getWeatherAndSongs = async () => {
    if (props.cityProps?.coords) {
      const weather = await getWeatherFromCoords(props.cityProps?.coords);
      setWeather(weather);
      const songs = await getSongsFromCoords(props.cityProps?.coords);
      setSongs(songs)
    }
  };

  useEffect(() => {
    setWeather(null);
    setSongs(null);
  }, [props.cityProps?.coords?.lat, props.cityProps?.coords?.lng])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

      }}
    >
      <Button variant="outlined" disabled={!props.cityProps?.coords} onClick={getWeatherAndSongs}>
        {props.cityProps?.name ?  `Get Weather And Songs for ${props.cityProps?.name}` : `Choose a city or use the geolocation`}
      </Button>
      {weather && (
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "space-between",
  
        }}>
          <h2>{weather?.current.temp} °</h2>
          <img
            src={`https://openweathermap.org/img/w/${weather?.current.weather[0].icon}.png`}
            alt={weather?.current.weather[0].description}
          />
        </Box>
      )}

      {songs && songs?.map((song: any) => (
        <>
          <h1>Songs Recommended:</h1>
          <Box
            onClick={() => window.open(song.url, '_blank')}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              margin: '10px',
              cursor: 'pointer',
              border: '1px solid grey',
              paddingLeft: '25px',
              paddingRight: '25px',
            }}>
          <img
            style={{
              marginRight: '12px'
            }}
            src={song.images.find((img: {height: number}) => img.height === 64).url}
          />
            <h2> - {song.name}</h2>
          </Box>
        </>
      ))
      }
    </Box>
  );
}

export default WeatherStatusComponent;
