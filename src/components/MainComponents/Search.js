import React from "react";
import './MainComponents.css';

function Search({ searchTerm, onChangeSearch }) {
  ///// Search Input box onChange
  function handleChange(event) {
    onChangeSearch(event.target.value);
  }

  return (
    <div className="search">
    <input className="search" 
    value={searchTerm} 
    onChange={handleChange}
    placeholder="Search" />
    </div>
  );
}

export default Search;