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
    const ids = selectOptions.map((options) => options.channel_id);
    console.log(ids);

    const response1 = await youtubeAPI.get('/search', {
      params: {
        channelId: ids[0],
      },
    });
    let sethShows = [...response1.data.items];

    console.log('response1:', response1.data.items);
    const response2 = await youtubeAPI.get('/search', {
      params: {
        channelId: ids[1],
      },
    });
    let seth_TrevorShows = [...sethShows, ...response2.data.items];
    console.log('response2:', seth_TrevorShows);
    const response3 = await youtubeAPI.get('/search', {
      params: {
        channelId: ids[2],
      },
    });
    let seth_Trevor_StephenShows = [...seth_TrevorShows, ...response3.data.items];
    console.log('response3:', seth_Trevor_StephenShows);
    setVideoDetails(seth_Trevor_StephenShows);
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

  const handleSelectSearch = () => {
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
      alert('Channel_ids that you selected are: ' + chosenOption);
      handleSelectSearch();
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
      />
      <ClipList videoDetailsToDisplay={videoDetailsToDisplay} hideClip={hideClip} />
    </div>
  );
};

export default App;
