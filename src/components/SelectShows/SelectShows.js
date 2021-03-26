import React from 'react';
import './SelectShows.css';

const Select = ({ selectOptions, handleChange, handleSubmit, chosenOption }) => {
  return (
    <form onSubmit={handleSubmit} className="form-element">
      <label htmlFor="shows">Choose one or more shows:</label>

      <select
        multiple={true}
        id="shows"
        className="select-element"
        value={chosenOption}
        onChange={event => {
          handleChange(event.target.value);
        }}
      >
        {selectOptions.map(item => (
          <option className="show-list-item" key={item.id} value={item.channel_id}>
            {item.title}
          </option>
        ))}
      </select>

      <input className="input-button" type="submit" value="Search" />
    </form>
  );
};

export default Select;
