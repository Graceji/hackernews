import React, { Component} from 'react';

function isSearched(query) {
  return item => {
    item.title = item.title ? item.title : '';
    return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  };
}

const largeColumn = {
  width: '40%'
};

function getItem(item) {
  return (
    <div key={item.objectID} className="table-row">
      <span style={largeColumn}>
        <a href={item.url}>
          {item.title}
        </a>
      </span>
      <span style={{width: '30%'}}>
        {item.author}
      </span>
      <span style={{width: '10%'}}>
        {item.points}
      </span>
    </div>
  );
}

function Table({ list, query }) {
  return (
    <div className="table"> 
      {list.map(item => getItem(item))}
    </div>
  );
}

export default Table;