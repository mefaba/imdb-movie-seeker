import React, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import { NoChanceForm } from "./components/Forms";
import axios from "axios";
import MovieList from "./components/MovieList";

function Home() {
  return (
    <>
      <div className="text-center mt-5">
        <h1>IMDB Movie Seeker</h1>
      </div>
      <div className="d-flex h-75 align-items-center justify-content-center">
        <div className="card w shadow p-3 mb-5 bg-white rounded ">
          <div className="card-body">
            <h5 className="card-title text-center">Welcome, </h5>

            <p className="card-text">Imdb Movie Seeker is simply a movie search tool, but an extraordinary one.</p>
            <p className="card-text">
              We used gender, age, popularity, and country data to show you a unique list of movies.
            </p>
            <p className="card-text">The rest is in your hands.</p>
            <div className="text-center">
              <Link to="/nochance" className="btn btn-primary primary-button">
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function App() {
  const [imdbData, setImdbData] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/mefaba/imdblookamovie/master/web-client/data/imdb_ratings.json")
      .then(function (response) {
        // handle success
        setImdbData(response.data);
      });
    return () => {};
  }, []);

  return (
    <div className="vh-100 p-2">
      <Routes>
        <Route
          exact
          path="/nochance"
          element={<NoChanceForm imdbData={imdbData} setMovieResults={setMovieResults} />}
        />
        <Route exact path="/movielist" element={<MovieList movieResults={movieResults} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
