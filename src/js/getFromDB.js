import axios from 'axios';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjljZGUzMzNlYTllYzhmNGEyZDY1N2RjYjY1YWNjZSIsInN1YiI6IjY0YmE3YzgzYWI2ODQ5MDBjNWRjZWI2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HDYDpTbMj7aRZfNmgtVv5rKB5k_ju-ZPQLAbSXbpF2A',
  },
};

const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/';

export const getFromDB = async (pathname = '') => {
  return await axios.get(`${BASE_URL}${pathname}`, options);
};
