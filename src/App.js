import './App.css';
import React, { useState, useEffect } from 'react';
import youtubeAPI from './apis/youtubeApi';
import SelectListItemsData from './searchData/searchData';
import Select from './components/SelectShows/SelectShows';
import ClipList from './components/ClipList/ClipList';

const App = () => {
  const [chosenOption, setChosenOption] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [videoDetailsToDisplay, setVideoDetailsToDisplay] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [hiddenVideoDetails, setHiddenVideoDetails] = useState([]);
  const resultArray = [];
  let ids = [];
  const channIDS = [
    'UCVTyTA7-g9nopHeHbeuvpRA',
    'UCwWhs_6x42TyRM4Wstoq8HA',
    'UCMtFAi84ehTSYSE9XoHefig',
  ];
  /*
  useEffect(() => {
    setSelectOptions(SelectListItemsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

  const getDataFromApi = (channelId) => {
    return new Promise((resolve, reject) => {
      youtubeAPI
        .get('/search', {
          params: {
            channelId: channelId,
            maxResults: 10 + hiddenVideoDetails.length,
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

  const mapChannelIds = async () => {
    console.log('start');
    //localStorage.clear();
    chosenOption.length === 0 ? (ids = [...channIDS]) : (ids = [...chosenOption]);
    //const ids = chosenOption.map((options) => options.channel_id);
    console.log(ids);
    //console.log('selected id', ids);
    setChosenOption('');
    const promises = ids.map(async (id) => {
      const videoDets = await getDataFromApi(id, 1);
      return videoDets;
    });

    const videoDetailsToGet = await Promise.all(promises);
    console.log(videoDetailsToGet);
    console.log('end');
    setVideoDetails(videoDetailsToGet);
  };

  const convertArray = () => {
    for (let i = 0; i < videoDetails.length; i++) {
      for (let j = 0; j < videoDetails[i].length; j++) {
        resultArray.push(videoDetails[i][j]);
      }
    }
    const hiddenArray = resultArray.filter((video) => {
      return !hiddenVideoDetails.includes(video.id.videoId);
    });
    setVideoDetailsToDisplay(hiddenArray);
  };

  useEffect(() => {
    convertArray();
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

  /* Data from youtube-api is stored in localStorage */
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('hiddenVideoDetails');
    setHiddenVideoDetails(
      storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : hiddenVideoDetails,
    );
    //setVideoDetails(storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : videoDetails);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenVideoDetails', JSON.stringify(hiddenVideoDetails));
    //localStorage.clear();  //uncomment this line to clear local storage
  }, [hiddenVideoDetails]);

  const handleSelect = (value) => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
    console.log(chosenOption);
  };

  const handleSearch = () => {
    const videoDetailsToShow = videoDetailsToDisplay.filter((video) => {
      return chosenOption.includes(video.snippet.channelId);
    });
    setVideoDetailsToDisplay(videoDetailsToShow);
    //console.log(videoDetailsToShow);
    setChosenOption('');
  };

  /*
  videoDetailsToDisplay.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });
  */

  const handleSubmit = (event) => {
    event.preventDefault();
    mapChannelIds();
  };

  const hideClip = (item) => {
    const filteredItem = videoDetailsToDisplay.filter((i) => i.id.videoId !== item.id.videoId);
    setHiddenVideoDetails([...hiddenVideoDetails, item.id.videoId]);
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
      */
