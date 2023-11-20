import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./pokemon.webp";
import "./Search.css";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pokemon/${searchValue.trimStart()}`);
  };

  return (
    <div className="search__main">
      <Link to="/">
        <div className="pokemon__logo">
          <img src={logo} alt="Pokedox Logo" />
          <p>Pokedox</p>
        </div>
      </Link>
      <form className="search__input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="seacrh.."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/pokemon/bookmarks">
        <div className="bookmarks">
          <p>Bookmarks</p>
        </div>
      </Link>
    </div>
  );
};

export default Search;
