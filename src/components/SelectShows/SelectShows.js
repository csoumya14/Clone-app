import React from 'react';

const Select = ({ selectOptions, handleSelect, handleSubmit, chosenValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shows">Choose a show:</label>
      <select
        multiple={true}
        value={chosenValue}
        onChange={(e) => {
          handleSelect(e.target.selectedOptions);
        }}
      >
        {selectOptions.map((item) => (
          <option key={item.id} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>
      <input type="submit" value="search" />
    </form>
  );
};

export default Select;
