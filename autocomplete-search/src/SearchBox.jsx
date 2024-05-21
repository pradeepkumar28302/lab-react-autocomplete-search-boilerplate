import React, { useState, useEffect, useRef } from 'react';
import countryData from './resources/countryData.json';
import './App.css';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query) {
      setFilteredSuggestions(
        countryData.filter((country) =>
          country.name.toLowerCase().startsWith(query.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        console.log("Escape")
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (event) => {
    setQuery(event.target.value);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    alert(`Searching for ${query}`);
    setShowSuggestions(false);
  };

  return (
    <div className="search-box" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {showSuggestions && (
        <select className="suggestions-dropdown" size="5" onChange={handleSuggestionClick}>
          {filteredSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion.name}>
              {suggestion.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SearchBox;
