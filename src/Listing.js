import React, { useState } from "react";

import "./Listing.css";

import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

import { capitalizeFirstLetter, isBookmarked } from "./functions";

import { useDispatch, useSelector } from "react-redux";

import { fetchPokemons } from "./pokemon";

import InfiniteScroll from "react-infinite-scroll-component";

const Listing = () => {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarked"))
  );

  const dispatch = useDispatch();

  const { pokemonData, loading, nextPage } = useSelector(
    (state) => state.pokemon
  );

  const handleDetailsPage = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const handleBookmark = (pokemon) => {
    const isBookmark = isBookmarked(pokemon.id, bookmarks);

    if (isBookmark === "active") {
      const newBookmark = bookmarks.filter((item) => item.id !== pokemon.id);
      localStorage.setItem("bookmarked", JSON.stringify(newBookmark));
      setBookmarks(newBookmark);
    } else {
      localStorage.setItem(
        "bookmarked",
        JSON.stringify([...bookmarks, pokemon])
      );
      setBookmarks([...bookmarks, pokemon]);
    }
  };

  return (
    <>
      <section className="listing-main">
        <div className="listing">
          <h2>Pokemons List</h2>
          <div className="listing-section">
            <div className="listing-div">
              {
                <InfiniteScroll
                  dataLength={pokemonData.length}
                  next={() => dispatch(fetchPokemons(nextPage))}
                  hasMore={!!nextPage}
                  loader={<Loading />}
                  endMessage={<p>No more Pokémon to load.</p>}
                  className="listing-div"
                >
                  {pokemonData.map((pokemon, index) => {
                    return (
                      <div key={pokemon.name + index} className="main-div">
                        <p className="pokemon-id">#{pokemon.id}</p>
                        <FaBookmark
                          className={`bookmark ${isBookmarked(
                            pokemon.id,
                            bookmarks
                          )}`}
                          onClick={() => handleBookmark(pokemon)}
                          alt=""
                        />
                        <div
                          className="inside-div"
                          onClick={() => handleDetailsPage(pokemon)}
                        >
                          <div className="img">
                            <img src={pokemon.sprites.front_default} alt="" />
                          </div>
                          <div className="pokemon-info">
                            <div style={{ display: "flex" }}>
                              <h4>Name : </h4>
                              <span>
                                &nbsp;{capitalizeFirstLetter(pokemon.name)}
                              </span>
                            </div>
                          </div>
                          <div className="pokemon-info">
                            <div style={{ display: "flex" }}>
                              <h4>weight : </h4>
                              <span>&nbsp;{pokemon.weight / 10} (Kg)</span>
                            </div>
                            <div style={{ display: "flex" }}>
                              <h4>height : </h4>
                              <span>&nbsp;{pokemon.height / 10} (m)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </InfiniteScroll>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
