import axios from "axios";

async function getCoordsFromCity(address: string) {
  const key = "9d53576de8ef6260ada1e512293dca3a";
  // const response = await axios.get<any>(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
  // );
  const response = await axios.get<any>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=${key}`
  );

  return response.data;
}

export default getCoordsFromCity;
