import axios from "axios";

// https://api.themoviedb.org/3 /movie/550?api_key=3ec86da84c61b49ea62e44abc4ae1cd2

export const key = '3ec86da84c61b49ea62e44abc4ae1cd2'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api; 