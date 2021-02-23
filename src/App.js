import './App.css';
import React, { useState, useEffect } from 'react';
import youtubeApi from './apis/youtubeApi';
import SearchData from './searchData/searchData';

const App = () => {
  const [chosenValue, setChosenValue] = useState([]);
  const [search, setSearch] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setSearch(SearchData);
  }, []);

  const searchItems = async () => {
    try {
    }
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await youtubeApi.get('/search', {
          params: {
            channelId: search[0].channel_id,
          },
        });
        console.log(response.data.item);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(chosenValue);
  };

  const handleChange = (event) => {
    setChosenValue((prev) => [...prev, event.target.value]);
  };

  const handleFormSubmit = (termFromSearchBar) => {
    let unique = termFromSearchBar.filter((v, i, a) => a.indexOf(v) === i);
    const show = search.filter((p) => p.title === termFromSearchBar);
    console.log(unique);
    /*
    const response = await youtubeApi.get('/search', {
      params: {
        channelId: show.channel_id,
      },
    });
    console.log(response.data.items);
    setVideos(response.data.items);
    */
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="shows">Choose a show:</label>
        <select multiple>
          {search.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <button onClick={(event) => handleChange(event)} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default App;
