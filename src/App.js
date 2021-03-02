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
  const [hiddenVideoIds, setHiddenVideoIds] = useState([]);
  const convertArray = [];
  let ids = [];

  const channelIDS = [
    'UCVTyTA7-g9nopHeHbeuvpRA',
    'UCwWhs_6x42TyRM4Wstoq8HA',
    'UCMtFAi84ehTSYSE9XoHefig',
  ];

  const mapChannelIds = async () => {
    console.log('start');
    chosenOption.length === 0 ? (ids = [...channelIDS]) : (ids = [...chosenOption]);
    console.log('selected id', ids);
    setChosenOption('');
    const promises = ids.map(async (id) => {
      const videoDetailPromise = await getDataFromApi(id, hiddenVideoIds.length);
      return videoDetailPromise;
    });

    const videoDetailsToGet = await Promise.all(promises);
    console.log(videoDetailsToGet);
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
  //console.log(videoDetailsToDisplay);

  useEffect(() => {
    console.log('effect');
    setSelectOptions(SelectListItemsData);
    mapChannelIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('render', selectOptions.length, 'options');
  console.log(videoDetails.length);

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
    mapChannelIds();
  };

  const hideClip = (item) => {
    const filteredItem = videoDetailsToDisplay.filter((i) => i.id.videoId !== item.id.videoId);
    setHiddenVideoIds([...hiddenVideoIds, item.id.videoId]);
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

/*
if (chosenOption.length === 0) {
        return resultArray;
      } else {
        return chosenOption.includes(video.snippet.channelId);
      }

      const handleSearch = () => {
    const videoDetailsToShow = videoDetailsToDisplay.filter((video) => {
      return chosenOption.includes(video.snippet.channelId);
    });
    setVideoDetailsToDisplay(videoDetailsToShow);
    //console.log(videoDetailsToShow);
    setChosenOption('');
  };

  /*
  const getDataFromApi = (channelId) => {
    return new Promise((resolve, reject) => {
      youtubeAPI
        .get('/search', {
          params: {
            channelId: channelId,
            maxResults: 1 + hiddenVideoDetails.length,
          },
        })
        .then((response) => {
          if (response !== null) resolve(response.data.items);
        })
        .catch((error) => {
          console.log('Error', error);
          reject(error);
        });
    });
  };
  */
