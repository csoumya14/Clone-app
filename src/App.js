import './App.css';
import React, { useState, useEffect } from 'react';
import youtube from './apis/youtubeApi';
import SearchData from './searchData/searchData';

import Select from './components/SelectShows/SelectShows';
import List from './components/ClipList/ClipList';

const App = () => {
  const [chosenValue, setChosenValue] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [videoDetailsToShow, setVideoDetailsToShow] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);

  useEffect(() => {
    setSelectOptions(SearchData);
  }, []);

  const handleSearch = async () => {
    const ids = selectOptions.map((options) => options.channel_id);
    console.log(ids);

    const response1 = await youtube.get('/search', {
      params: {
        channelId: ids[0],
      },
    });
    let array1 = [...response1.data.items];

    console.log('response1:', response1.data.items);
    const response2 = await youtube.get('/search', {
      params: {
        channelId: ids[1],
      },
    });
    let newArray = [...array1, ...response2.data.items];
    console.log('response2:', newArray);
    const response3 = await youtube.get('/search', {
      params: {
        channelId: ids[2],
      },
    });
    let mergedArrays = [...newArray, ...response3.data.items];
    console.log('response3:', mergedArrays);
    setVideoDetails(mergedArrays);
  };
  console.log(videoDetails.length);
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('videoDetails');
    setVideoDetails(storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : videoDetails);
    //storedVideoDetails === null ? handleSearch() : setVideoDetails(JSON.parse(storedVideoDetails));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('videoDetails', JSON.stringify(videoDetails));
  }, [videoDetails]);

  const handleSelectSearch = () => {
    const videoDetailsToShow = videoDetails.filter((video) => {
      return chosenValue.includes(video.snippet.channelId);
    });
    setVideoDetailsToShow(videoDetailsToShow);
    //console.log(videoDetailsToShow);
    setChosenValue('');
  };

  videoDetailsToShow.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);

    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });

  const handleSelect = (value) => {
    if (!chosenValue.includes(value)) setChosenValue([...chosenValue, value]);
    console.log(chosenValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your favorite shows are: ' + chosenValue);
    if (videoDetails.length === 0) {
      handleSearch();
    } else {
      handleSelectSearch();
    }
  };

  const hideClip = (item) => {
    const filteredItem = videoDetails.filter((i) => i.id !== item.id);
    setVideoDetails(filteredItem);
  };

  return (
    <div className="App">
      <Select
        selectOptions={selectOptions}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        chosenValue={chosenValue}
      />
      <List videoDetailsToShow={videoDetailsToShow} hideClip={hideClip} />
    </div>
  );
};

export default App;

/*
<List newVideoDetails={videoDetails} hideClip={hideClip} />
const response = await youtube.get('/search', {
      params: {
        q: termFromSearchBar,
      },
    });
    setVideos(response.data.item);
    console.log(response.data.item);


    /*
  const getSethMyersShow = async (id) => {
    try {
      const response = await youtube.get('search', {
        params: {
          channelId: id,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrevorNoahsShow = async (id) => {
    try {
      const response = await youtube.get('/search', {
        params: {
          channelId: id,
        },
      });
      setVideos((prev) => [...prev, response.data.items]);

      console.log(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const getStephenColbertShow = async (id) => {
    try {
      const response = await youtube.get('/search', {
        params: {
          channelId: id,
        },
      });
      setVideos((prev) => [...prev, response.data.items]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const ids = selectOptions.map((options) => options.channel_id);
    return [getSethMyersShow(ids[0]), getTrevorNoahsShow(ids[1]), getStephenColbertShow(ids[2])];
  });

  
  const handleFormSubmit = async (termFromSearchBar) => {
    console.log(termFromSearchBar);
    const response = await youtube.get('/search', {
      params: {
        q: termFromSearchBar,
      },
    });
    setVideos(response.data.items);
    console.log(response.data.items);
  };

  return chosenValue.every((v) => {
        return video.snippet.channelId === v;
      });
  */
