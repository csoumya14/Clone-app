import axios from 'axios';
const KEY = '';

const youTubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});

export default youTubeApi;
