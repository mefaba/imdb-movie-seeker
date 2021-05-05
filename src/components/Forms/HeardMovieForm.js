import React from "react";

const HeardMovieForm = () => {
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="movietitle1" className="form-label">
            Movie Title
          </label>
          <input type="email" className="form-control" id="movietitle1" aria-describedby="movie-title" />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" aria-label="Default select example">
            <option select="true" defaultValue={3}>
              All Together
            </option>
            <option defaultValue={1}>Male</option>
            <option defaultValue={2}>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age Group</label>
          <select className="form-select" aria-label="Default select example">
            <option select="true" defaultValue={1}>
              All
            </option>
            <option defaultValue={2}>18-29</option>
            <option defaultValue={3}>30-44</option>
            <option defaultValue={3}>Over 45</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Get IMDB Score
        </button>
      </form>
    </div>
  );
};

export default HeardMovieForm;
