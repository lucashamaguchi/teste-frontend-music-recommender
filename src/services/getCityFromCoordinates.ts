import axios from "axios";

async function getCityFromCoordinates(coords: {
  lat: number | null;
  lng: number | null;
}) {
  const key = "9d53576de8ef6260ada1e512293dca3a";
  const response = await axios.get<any>(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lng}&appid=${key}`
  );

  return response.data;
}

export default getCityFromCoordinates;
