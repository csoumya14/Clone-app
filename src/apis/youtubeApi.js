import axios from 'axios';
const KEY = 'AIzaSyBrq7CWaBLpWJxIpJzqOMvFT5CmK1dG7AA';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});
