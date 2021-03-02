import axios from 'axios';
const KEY = 'AIzaSyAz2JAgqopBbIbZaGDVE24NiTvnb6A0wLU';

const youTubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});

export default youTubeApi;
