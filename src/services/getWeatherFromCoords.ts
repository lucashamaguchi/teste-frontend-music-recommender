import axios from "axios";

async function getWeather(coords: { lat: number | null; lng: number | null }) {
  const key = "9d53576de8ef6260ada1e512293dca3a";
  const response = await axios.get<any>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${key}&exclude=minutely,hourly,daily,weekly&units=metric`
  );
  return response.data;
}

export default getWeather;
