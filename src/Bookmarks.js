import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { capitalizeFirstLetter } from "./functions";

import { updateActiveRoute } from "./pokemon";

const Bookmarks = () => {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarked"))
  );

  const dispatch = useDispatch();

  const handleBookmark = (id) => {
    const newBookmark = bookmarks.filter((item) => item.id !== id);
    localStorage.setItem("bookmarked", JSON.stringify(newBookmark));
    setBookmarks(newBookmark);
  };

  const handleDetailsPage = (pokemon) => {
    dispatch(updateActiveRoute(null));
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    dispatch(updateActiveRoute("/pokemon/bookmarks"));
  }, []);

  return (
    <>
      <section className="listing-main">
        <div className="listing">
          <h2>Your Bookmarks</h2>
          <div className="listing-section">
            <div className="listing-div">
              {bookmarks.length === 0 ? "No bookmarks" : null}
              {bookmarks.map((pokemon, index) => {
                return (
                  <div key={pokemon.name + index} className="main-div">
                    <p className="pokemon-id">#{pokemon.id}</p>
                    <FaBookmark
                      className="bookmark active"
                      onClick={() => handleBookmark(pokemon.id)}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookmarks;
