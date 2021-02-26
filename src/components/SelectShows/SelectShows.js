import React from 'react';

const Select = ({ selectOptions, handleSelect, handleSubmit, chosenValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shows">Choose a show:</label>
      <select multiple={true}>
        {selectOptions.map((item) => (
          <option key={item.id} value={item.title} onClick={() => handleSelect(item.channel_id)}>
            {item.title}
          </option>
        ))}
      </select>
      <input type="submit" value="search" />
    </form>
  );
};

export default Select;

/*
onChange={(e) => {
          handleSelect(e.target.selectedOptions);
        }}
        value={chosenValue}
        onClick={() => handleSelect(item.channel_id)}
        */
