import React, { useEffect } from "react";
import Bookmarks from "./Bookmarks";
import Details from "./Details";
import Listing from "./Listing";
import Search from "./Search";
import { useDispatch } from "react-redux";

import { fetchPokemons, updateActiveRoute } from "./pokemon";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveRoute("/"));
    dispatch(fetchPokemons("https://pokeapi.co/api/v2/pokemon"));

    if (!localStorage.getItem("bookmarked")) {
      localStorage.setItem("bookmarked", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Search />
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/pokemon/:name" element={<Details />} />
          <Route path="/pokemon/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  );
}
