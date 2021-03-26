import axios from 'axios';
const KEY = 'AIzaSyBL0R4RfJUDmDf1PNFgOn6E1EqzR3NOtqc';

const youTubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});

export default youTubeApi;
