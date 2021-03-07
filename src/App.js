import React, { useState, useEffect } from 'react';
import { getDataFromApi } from './services/FetchData';
import './App.css';
import SelectListItemsData from './searchData/searchData';
import Select from './components/SelectShows/SelectShows';
import ClipList from './components/ClipList/ClipList';

const App = () => {
  const [chosenOption, setChosenOption] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [videoDetailsToDisplay, setVideoDetailsToDisplay] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [maxResult, setMaxResult] = useState(0);
  const [hiddenVideoDetails, setHiddenVideoDetails] = useState([
    {
      channel_id: 'UCVTyTA7-g9nopHeHbeuvpRA',
      hiddenVideoId: [],
    },
    {
      channel_id: 'UCwWhs_6x42TyRM4Wstoq8HA',
      hiddenVideoId: [],
    },
    {
      channel_id: 'UCMtFAi84ehTSYSE9XoHefig',
      hiddenVideoId: [],
    },
  ]);
  const convertArray = [];
  let ids = [];

  // max number of clips to fetch
  const findMaxResult = () => {
    let maxResult = 0;
    if (chosenOption.length === 1) {
      maxResult = 10;
    } else if (chosenOption.length === 2) {
      maxResult = 5;
    } else {
      maxResult = 4;
    }
    setMaxResult(maxResult);
  };

  //console.log('maxResult:', maxResult);

  const getVideoDetailsAsync = async () => {
    console.log('start');
    const hiddenvideoIdsForChosenShow = hiddenVideoDetails.filter((obj) => {
      return chosenOption.includes(obj.channel_id);
    });
    // if no shows are chosen all channel ids are given as input if shows are selected only channel ids corresponding to each
    //chosen show is given as input
    chosenOption.length === 0 ? (ids = hiddenVideoDetails) : (ids = hiddenvideoIdsForChosenShow);
    console.log('selected id', ids);

    //console.log(hiddenvideoIdsForChosenShow);

    const promises = ids.map(async (id) => {
      const videoDetailPromise = await getDataFromApi(
        id.channel_id,
        maxResult + id.hiddenVideoId.length,
      );
      return videoDetailPromise;
    });

    const videoDetailsToGet = await Promise.all(promises);
    setChosenOption('');
    console.log('end');
    setVideoDetails(videoDetailsToGet);
  };
  console.log('videoDetails without modifying:', videoDetails);

  const modifyArray = () => {
    //Fetched data is modified to get an array of objects also hidden video details are filtered out from the data
    for (let i = 0; i < videoDetails.length; i++) {
      for (let j = 0; j < videoDetails[i].length; j++) {
        convertArray.push(videoDetails[i][j]);
      }
    }

    const videoDetailsWithoutHiddenIds = convertArray.filter(function (video) {
      return !hiddenVideoDetails.some(function (hiddenVideos) {
        return hiddenVideos.hiddenVideoId.includes(video.id.videoId || video.id.playlistId);
      });
    });
    setVideoDetailsToDisplay(videoDetailsWithoutHiddenIds);
  };

  useEffect(() => {
    modifyArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoDetails]);
  console.log('videoDetailsToDisplay:', videoDetailsToDisplay);

  useEffect(() => {
    setSelectOptions(SelectListItemsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findMaxResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOption]);

  //console.log(videoDetails.length);

  //hidden and played video ids are stored in localStorage
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('hiddenVideoIds');
    setHiddenVideoDetails(
      storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : hiddenVideoDetails,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenVideoIds', JSON.stringify(hiddenVideoDetails));
    //localStorage.clear();  //uncomment this line to clear local storage
  }, [hiddenVideoDetails]);

  const handleSelect = (value) => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
    console.log(chosenOption);
  };

  //VideoDetails are time sorted so that newest clips come first
  videoDetailsToDisplay.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    getVideoDetailsAsync();
  };

  //when hide button is clicked or a video is played the clip is filtered out and details of the clip,
  //videoId and channel id, are stored in local storage
  const hideClip = (item) => {
    const filteredItem = videoDetailsToDisplay.filter(
      (i) => (i.id.videoId || i.id.playlistId) !== (item.id.videoId || item.id.playlistId),
    );
    setVideoDetailsToDisplay(filteredItem);

    const toBeHidden = hiddenVideoDetails.find((v) => v.channel_id === item.snippet.channelId);
    const hiddenVideo = {
      ...toBeHidden,
      hiddenVideoId: [...toBeHidden.hiddenVideoId, item.id.videoId || item.id.playlistId],
    };
    setHiddenVideoDetails(
      hiddenVideoDetails.map((v) => (v.channel_id !== item.snippet.channelId ? v : hiddenVideo)),
    );
    //console.log(hiddenVideo);
  };
  return (
    <div className="App">
      <Select
        selectOptions={selectOptions}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        chosenOption={chosenOption}
      />
      <ClipList videoDetailsToDisplay={videoDetailsToDisplay} hideClip={hideClip} />
    </div>
  );
};

export default App;
