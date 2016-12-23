import React, { Component} from 'react';

function Search({ onChange, value, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text"
        onChange={onChange}
        value={value}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  );
}

export default Search;