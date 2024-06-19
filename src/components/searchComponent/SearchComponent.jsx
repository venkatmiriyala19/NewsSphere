import React, { useState, useEffect } from "react";
import "./SearchComponent.css";

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    if (query.trim() !== "") {
      try {
        const response = await fetch(
          `https://content.guardianapis.com/search?q=${query}`
        );
        const data = await response.json();
        setResults(data.response.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    onSearch(query);
  };

  return (
    <div className="search-outer-container">
      <h1 className="NewsSphere-title">NewsSphere</h1>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={handleInputChange}
            className="search__input"
          />
          <button className="search__button">
            <svg
              className="search__icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>
      </form>
      <ul>
        {results.map((article) => (
          <li key={article.id}>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
              {article.webTitle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
