import axios from "axios";

async function getSongsFromCoords(coords: { lat: number | null; lng: number | null }) {
  const response = await axios.get<any>(
    `https://music-recommender.hamaguchi.com.br/api/music-recommendation/?lat=${coords.lat}&long=${coords.lng}`
  );
  return response.data.songs;
}

export default getSongsFromCoords;
