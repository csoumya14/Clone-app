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

  useEffect(() => {
    setSelectOptions(SelectListItemsData);
  }, []);

  const getDataFromApi = async () => {
    //localStorage.clear();
    const ids = selectOptions.map((options) => options.value);
    const response1 = youtubeAPI.get('/search', {
      params: {
        channelId: ids[0],
      },
    });

    const response2 = youtubeAPI.get('/search', {
      params: {
        channelId: ids[1],
      },
    });

    const response3 = youtubeAPI.get('/search', {
      params: {
        channelId: ids[2],
      },
    });
    let sethShows = await response1;
    let trevorShows = await response2;
    let stephenShows = await response3;

    let finalResult = [
      ...sethShows.data.items,
      ...trevorShows.data.items,
      ...stephenShows.data.items,
    ];

    setVideoDetails(finalResult);
  };
  console.log(videoDetails.length);
  /*
  useEffect(() => {
    getDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

  /* Data from youtube-api is stored in localStorage */
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('videoDetails');
    setVideoDetails(storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : videoDetails);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('videoDetails', JSON.stringify(videoDetails));
    //localStorage.clear();  //uncomment this line to clear local storage
  }, [videoDetails]);

  const handleSearch = () => {
    const videoDetailsToShow = videoDetails.filter((video) => {
      if (chosenOption.length === 0) {
        return videoDetails;
      } else {
        return chosenOption.includes(video.snippet.channelId);
      }
    });
    setVideoDetailsToDisplay(videoDetailsToShow);
    //console.log(videoDetailsToShow);
    setChosenOption('');
  };

  videoDetailsToDisplay.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });

  const handleSelect = (value) => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
    console.log(chosenOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (videoDetails.length === 0) {
      getDataFromApi();
      alert('Please select show and click on search button again');
    } else {
      alert(`You have selected ${chosenOption.length} shows`);

      handleSearch();
    }
  };

  const hideClip = (item) => {
    const filteredItem = videoDetailsToDisplay.filter((i) => i.id !== item.id);
    setVideoDetails(videoDetails.filter((i) => i.id !== item.id));
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
