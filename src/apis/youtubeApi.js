import axios from 'axios';
const KEY = 'AIzaSyCfggMbcBcVJMkVYfpCr9epnu35y9CbH04';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY,
  },
});
