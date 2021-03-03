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

  const [hiddenVideoIds, setHiddenVideoIds] = useState([
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

  console.log('maxResult:', maxResult);

  const getVideoDetailsAsync = async () => {
    console.log('start');
    const hvid = hiddenVideoIds.filter((obj) => {
      return chosenOption.includes(obj.channel_id);
    });
    chosenOption.length === 0 ? (ids = hiddenVideoIds) : (ids = hvid);
    console.log('selected id', ids);

    console.log(hvid);

    const promises = ids.map(async (id) => {
      const videoDetailPromise = await getDataFromApi(
        id.channel_id,
        maxResult + id.hiddenVideoId.length,
      );
      return videoDetailPromise;
    });

    const videoDetailsToGet = await Promise.all(promises);
    setChosenOption('');
    console.log('videoDetails:', videoDetailsToGet);
    console.log('end');
    setVideoDetails(videoDetailsToGet);
  };

  const modifyArray = () => {
    for (let i = 0; i < videoDetails.length; i++) {
      for (let j = 0; j < videoDetails[i].length; j++) {
        convertArray.push(videoDetails[i][j]);
      }
    }
    const videoDetailsWithoutHiddenIds = convertArray.filter((video) => {
      return !hiddenVideoIds.includes(video.id.videoId);
    });
    setVideoDetailsToDisplay(videoDetailsWithoutHiddenIds);
  };

  useEffect(() => {
    modifyArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoDetails]);
  console.log('videoDetailsToDisplay:', videoDetailsToDisplay);

  useEffect(() => {
    console.log('effect');
    setSelectOptions(SelectListItemsData);

    //getVideoDetailsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findMaxResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOption]);

  //console.log(videoDetails.length);

  /* hidden and played video ids are stored in localStorage */
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('hiddenVideoIds');
    setHiddenVideoIds(
      storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : hiddenVideoIds,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenVideoIds', JSON.stringify(hiddenVideoIds));
    //localStorage.clear();  //uncomment this line to clear local storage
  }, [hiddenVideoIds]);

  const handleSelect = (value) => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
    console.log(chosenOption);
  };

  videoDetailsToDisplay.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    getVideoDetailsAsync();
  };

  const hideClip = (item) => {
    const filteredItem = videoDetailsToDisplay.filter((i) => i.id.videoId !== item.id.videoId);
    const toBeHidden = hiddenVideoIds.find((v) => v.channel_id === item.snippet.channelId);

    const hiddenVideo = {
      ...toBeHidden,
      hiddenVideoId: [...toBeHidden.hiddenVideoId, item.id.videoId],
    };
    setHiddenVideoIds(
      hiddenVideoIds.map((v) => (v.channel_id !== item.snippet.channelId ? v : hiddenVideo)),
    );
    console.log(hiddenVideo);

    setVideoDetailsToDisplay(filteredItem);
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
