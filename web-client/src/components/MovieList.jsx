import React, { useEffect, useState } from "react";
//import "./styles.css";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);

const MovieList = ({ movieResults }) => {
  const API_KEY = "3463c07570a9216f036e19b547fbde85";
  let movieResultsLimited = movieResults.slice(0, 5);

  let [tenMovieResults, setTenMovieResults] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  console.log("🚀 ~ MovieList ~ tenMovieResults", tenMovieResults);

  useEffect(() => {
    let promises = [];
    movieResultsLimited.forEach((movieObject) => {
      promises.push(
        axios
          .get(`https://api.themoviedb.org/3/movie/${movieObject.imdb_title_id}?api_key=${API_KEY}`)
          .then(({ data }) => {
            return { ...movieObject, poster_path: data.poster_path };
          })
      );
    });

    Promise.all(promises).then((promisedData) => {
      setTenMovieResults(promisedData);
    });
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <h1>Movies</h1>
      </div>

      <div className="d-flex h-75 flex-column justify-content-center align-items-center">
        <div className="text-center movie-sort-number">
          <h1>{slideIndex + 1}</h1>
        </div>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          className="mySwiper"
          onSlideChange={(e) => setSlideIndex(e.activeIndex)}
        >
          {tenMovieResults.length &&
            tenMovieResults.map((movie, index) => {
              return (
                <SwiperSlide className="movie-card">
                  <div className="imdb-rating-indicator">{movie.weighted_average_vote}</div>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieList;

/*  <button type="button" className="btn btn-lg btn-warning mb-1">
                {index + 1}-{movie.original_title}, {movie.weighted_average_vote}
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
              </button> */
