import React, { useState } from "react";
import { useForm } from "react-hook-form";

const HeardMovieForm = (props) => {
  const { imdbData } = props;
  const [imdbScore, setImdbScore] = useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    movieLooker(data);
  };

  const movieLooker = (data) => {
    const theMovie = imdbData.filter((eachMovie) => {
      return eachMovie["original_title"] === data["movie-title"];
    });
    if (!theMovie.length) {
      setImdbScore("no movie in this name is found");
      return;
    } else {
      let searchCriteria = `${data.gender}_${data["age-group"]}_avg_vote`;
      setImdbScore(theMovie[0][searchCriteria]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="movietitle1" className="form-label">
            Movie Title
          </label>
          <input
            {...register("movie-title")}
            className="form-control"
            id="movietitle1"
            aria-describedby="movie-title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select {...register("gender")} className="form-select" aria-label="Default select example">
            <option select="true" value={"allgenders"}>
              All Together
            </option>
            <option value={"males"}>Male</option>
            <option value={"females"}>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age Group</label>
          <select {...register("age-group")} className="form-select" aria-label="Default select example">
            <option select="true" value={"allages"}>
              All
            </option>
            <option value={"18age"}>18-29</option>
            <option value={"30age"}>30-44</option>
            <option value={"45age"}>Over 45</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mb-3">
          Get IMDB Score
        </button>
      </form>
      <div className="container">
        <div className="row">
          <button type="button" className="btn btn-lg btn-success mb-5">
            Success
          </button>
        </div>

        <button type="button" className="btn btn-lg btn-warning">
          "{imdbScore}"
        </button>
      </div>
    </div>
  );
};

export default HeardMovieForm;
