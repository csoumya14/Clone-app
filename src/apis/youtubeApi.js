import axios from 'axios';
const KEY = 'AIzaSyAz2JAgqopBbIbZaGDVE24NiTvnb6A0wLU';
const KEYY = 'AIzaSyCfggMbcBcVJMkVYfpCr9epnu35y9CbH04';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEYY,
  },
});
