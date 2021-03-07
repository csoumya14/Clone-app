import React from 'react';
import './SelectShows.css';

const Select = ({ selectOptions, handleSelect, handleSubmit, chosenOption }) => {
  return (
    <form onSubmit={handleSubmit} className="form-element">
      <label htmlFor="shows">Choose one or more shows:</label>

      <select multiple={true} id="shows" className="select-element">
        {selectOptions.map((item) => (
          <option
            className="show-list-item"
            key={item.id}
            value={item.title}
            onClick={() => handleSelect(item.channel_id)}
          >
            {item.title}
          </option>
        ))}
      </select>

      <label>
        {chosenOption && (
          <label htmlFor="shows">
            <p className="para">Total number of shows chosen are : {chosenOption.length}</p>
          </label>
        )}
      </label>
      <input className="input-button" type="submit" value="Search" />
    </form>
  );
};

export default Select;
