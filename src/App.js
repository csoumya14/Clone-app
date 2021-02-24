import './App.css';
import React, { useState, useEffect } from 'react';
//import youtube from './apis/youtubeApi';
import SearchData from './searchData/searchData';
import FakeData from './searchData/FakeData';
import Select from './components/SelectShows/SelectShows';
import List from './components/ClipList/ClipList';

const App = () => {
  const [chosenValue, setChosenValue] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [newVideoDetails, setNewVideoDetails] = useState([]);

  const convertTime = (timeValue) => {
    const newTime = new Date(timeValue);
    var myDate = newTime.getFullYear() + '/' + newTime.getDate() + '/' + (newTime.getMonth() + 1);
    return myDate;
  };

  useEffect(() => {
    setSelectOptions(SearchData);
    setVideoDetails(FakeData);
    changeDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDate = () => {
    videoDetails.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });

    const nVideoDetails = videoDetails.map((details) => ({
      ...details,
      date: convertTime(details.date),
    }));
    setNewVideoDetails(nVideoDetails);
    console.log(newVideoDetails);
  };

  //FakeData.forEach((details) => convertTime(details.date))

  const handleSelect = (selectedItems) => {
    const shows = [];
    for (let i = 0; i < selectedItems.length; i++) {
      shows.push(selectedItems[i].value);
    }
    setChosenValue(shows);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your favorite flavor is: ' + chosenValue);
    //handleFormSubmit(chosenValue);
  };

  const hideClip = (item) => {
    const filteredItem = newVideoDetails.filter((i) => i.id !== item.id);
    setNewVideoDetails(filteredItem);
  };

  return (
    <div className="App">
      <Select
        selectOptions={selectOptions}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        chosenValue={chosenValue}
      />
      <button onClick={() => changeDate()}></button>
      <List newVideoDetails={newVideoDetails} hideClip={hideClip} />
    </div>
  );
};

export default App;

/*

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
  */
