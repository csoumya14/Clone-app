import React, { useState, useEffect } from 'react';
import { getDataFromApi } from './services/FetchData';
import './App.css';
import SelectListItemsData from './searchData/searchData';
import Select from './components/SelectShows/SelectShows';
import ClipList from './components/ClipList/ClipList';

const App = () => {
  const [chosenOption, setChosenOption] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
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

  // max number of clips to fetch
  const findMaxResult = () => {
    let maxResult = 0;
    if (chosenOption.length === 1) {
      maxResult = 1;
    } else if (chosenOption.length === 2) {
      maxResult = 1;
    } else {
      maxResult = 1;
    }
    setMaxResult(maxResult);
  };

  //console.log('maxResult:', maxResult);

  const getVideoDetailsAsync = async () => {
    let ids = [];
    let videoss = [];
    console.log('start');

    const hiddenvideoIdsForChosenShow = hiddenVideoDetails.filter(obj => {
      return chosenOption.includes(obj.channel_id);
    });
    // if no shows are chosen all channel ids are given as input if shows are selected only channel ids corresponding to each
    //chosen show is given as input
    const arrayOfHiddenVideoIds = [
      ...new Set([].concat(...hiddenVideoDetails.map(videoDetail => videoDetail.hiddenVideoId))),
    ];

    console.log(arrayOfHiddenVideoIds);
    chosenOption.length === 0 ? (ids = hiddenVideoDetails) : (ids = hiddenvideoIdsForChosenShow);

    ids.forEach(id => {
      getDataFromApi(id.channel_id, maxResult + id.hiddenVideoId.length)
        .then(videos => {
          videoss.push(videos);
          //setVideoDetails(videoss.flat());
          modifyArray(videoss.flat());
        })
        .catch(error => {
          console.log(error);
        });
    });
    modifyArray(arrayOfHiddenVideoIds);
  };
  console.log(videoDetails);

  const modifyArray = videosDetails => {
    const videoDetailsWithoutHiddenIds = videosDetails.filter(function (video) {
      return !hiddenVideoDetails.some(function (hiddenVideos) {
        console.log(hiddenVideos.hiddenVideoId);
        return hiddenVideos.hiddenVideoId.includes(video.id.videoId || video.id.playlistId);
      });
    });
    /*
    const convertArrayWithoutHiddenIds = videosDetails.filter(
      item => !arrayOfHiddenVideoIds.includes(item.id.videoId || item.id.playlistId),
    );
    */
    const convertArraySliced = videoDetailsWithoutHiddenIds
      .sort((a, b) => {
        var dateA = new Date(a.snippet.publishedAt);
        var dateB = new Date(b.snippet.publishedAt);
        return dateB - dateA;
      })
      .slice(0, 10);
    setVideoDetails(convertArraySliced);
  };

  useEffect(() => {
    setSelectOptions(SelectListItemsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findMaxResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOption]);

  const handleChange = value => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
    console.log(chosenOption);
  };

  //VideoDetails are time sorted so that newest clips come first

  const handleSubmit = event => {
    event.preventDefault();
    getVideoDetailsAsync();
  };

  //when hide button is clicked or a video is played the clip is filtered out and details of the clip,
  //videoId and channel id, are stored in local storage
  const hideClip = item => {
    const filteredItem = videoDetails.filter(
      i => (i.id.videoId || i.id.playlistId) !== (item.id.videoId || item.id.playlistId),
    );
    setVideoDetails(filteredItem);

    const toBeHidden = hiddenVideoDetails.find(v => v.channel_id === item.snippet.channelId);
    const hiddenVideo = {
      ...toBeHidden,
      hiddenVideoId: [...toBeHidden.hiddenVideoId, item.id.videoId || item.id.playlistId],
    };
    setHiddenVideoDetails(
      hiddenVideoDetails.map(v => (v.channel_id !== item.snippet.channelId ? v : hiddenVideo)),
    );
    //console.log(hiddenVideo);
  };
  return (
    <div className="App">
      <Select
        selectOptions={selectOptions}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        chosenOption={chosenOption}
      />
      <ClipList videoDetailsToDisplay={videoDetails} hideClip={hideClip} />
    </div>
  );
};

export default App;
