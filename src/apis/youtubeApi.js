import axios from 'axios';
const KEY = 'AIzaSyBzWkEaerW39gOdX3k6IJ9xUfpmaUfXSk8';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY,
  },
});

//channelId
