import React, { useState } from "react";
import "./App.css";
import CityInput, {
  ICityProperties,
} from "./components/CityInput/CityInput.component";
import WeatherStatus from "./components/WeatherStatus/WeatherStatus.component";
import Geolocation from "./components/Geolocation/Geolocation.component";
import styled from "styled-components";
import Box from "@mui/material/Box";

const CityInputStyle = styled.div`
  margin: 30px auto;
`;

const GeolocationStyle = styled.div`
  margin: 10px auto;
`;

const WeatherStatusStyle = styled.div`
  margin: 30px auto;
`;

function App() {
  const [cityProps, setCityProps] = useState<ICityProperties | null>(null);

  return (
    <Box
      sx={{
        margin: "50px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 style={{
        textAlign: 'center',
      }}>GetWeather App With Music</h1>
      <CityInputStyle>
        <CityInput onSelect={setCityProps} />
      </CityInputStyle>
      <GeolocationStyle>
        <Geolocation onSelect={setCityProps} />
      </GeolocationStyle>
      <WeatherStatusStyle>
        <WeatherStatus cityProps={cityProps} />
      </WeatherStatusStyle>
    </Box>
  );
}

export default App;
