import axios from 'axios';
const KEY = 'AIzaSyAz2JAgqopBbIbZaGDVE24NiTvnb6A0wLU';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY,
  },
});
