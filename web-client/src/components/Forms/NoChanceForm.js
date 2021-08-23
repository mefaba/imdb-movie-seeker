import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";
const countries = [
  "USA",
  "Germany",
  "Sweden",
  "Soviet Union",
  "UK",
  "France",
  "Italy",
  "Denmark",
  "Japan",
  "Mexico",
  "India",
  "Austria",
  "Finland",
  "Poland",
  "Greece",
  "Spain",
  "Switzerland",
  "Canada",
  "Cuba",
  "Algeria",
  "Czechoslovakia",
  "Senegal",
  "Hungary",
  "Hong Kong",
  "Yugoslavia",
  "West Germany",
  "Netherlands",
  "Norway",
  "Australia",
  "Lebanon",
  "South Africa",
  "Libya",
  "Brazil",
  "Turkey",
  "Argentina",
  "New Zealand",
  "China",
  "Iran",
  "Ireland",
  "Belgium",
  "Federal Republic of Yugoslavia",
  "Portugal",
  "Taiwan",
  "Republic of North Macedonia",
  "Russia",
  "Czech Republic",
  "Jamaica",
  "Bulgaria",
  "Iceland",
  "South Korea",
  "Romania",
  "Serbia",
  "Israel",
  "Thailand",
  "Afghanistan",
  "Chile",
  "Colombia",
  "Isle Of Man",
  "Luxembourg",
  "Palestine",
  "Bosnia and Herzegovina",
  "Slovakia",
  "Estonia",
  "Bahamas",
  "Peru",
  "Papua New Guinea",
  "Georgia",
  "United Arab Emirates",
  "Ukraine",
  "Panama",
  "Indonesia",
  "Puerto Rico",
  "Nigeria",
  "Saudi Arabia",
  "Paraguay",
  "Venezuela",
  "Kenya",
  "Singapore",
  "Egypt",
  "Malta",
  "Mauritania",
  "Lithuania",
  "Cambodia",
  "Somalia",
  "Uruguay",
];

const countriesArrayOfObjects = countries.map((country) => {
  return { text: country, value: country };
});

const NoChanceForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    movieLooker({
      gender: data.gender,
      ageGroup: data["age-group"],
      movieDate: data["movie-date"].split(","),
      popularity: data.popularity.split(","),
      duration: data.duration.split(","),
      movieCountry: countryFilter,
    });
  };

  const { imdbData } = props;
  const [movieResults, setMovieResults] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  console.log("🚀 ~ NoChanceForm ~ countryFilter", countryFilter);

  const movieLooker = (data) => {
    /* Bunch of Filter  */
    let matchedMovies = imdbData.filter((eachMovie) => {
      let dateFilter = data.movieDate[0] < eachMovie.year && eachMovie.year < data.movieDate[1];
      let popularityFilter =
        data.popularity[0] < eachMovie["total_votes"] && eachMovie["total_votes"] < data.popularity[1];
      let durationFilter = data.duration[0] < eachMovie["duration"] && eachMovie["duration"] < data.duration[1];

      return dateFilter && popularityFilter && durationFilter;
    });
    if (countryFilter.length) {
      matchedMovies = matchedMovies.filter((eachMovie) => {
        return countryFilter.includes(eachMovie.country);
      });
    }

    /* Age and Gender Sort */
    let searchCriteria = `${data.gender}_${data.ageGroup}_avg_vote`;

    matchedMovies = matchedMovies.sort((a, b) => {
      //console.log(a[searchCriteria], b[searchCriteria]);
      if (a[searchCriteria] > b[searchCriteria]) {
        return -1;
      } else if (a[searchCriteria] < b[searchCriteria]) {
        return 1;
      }
      return 0;
    });
    //console.log("sorted matchedMovies:", matchedMovies);

    //console.log("matchedMovies:", matchedMovies);
    setMovieResults(matchedMovies);
  };

  const handleChange = (event, { value }) => {
    setCountryFilter(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-grid gap-2 col-6 mx-auto">
          <label className="form-label">Gender</label>
          <select {...register("gender")} className="form-select" aria-label="Default select example">
            <option select="true" value={"allgenders"}>
              All Together
            </option>
            <option value={"males"}>Male</option>
            <option value={"females"}>Female</option>
          </select>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
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
        <div className="container">
          <div className="row">
            <label className="form-label">Release Date</label>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="all-dates"
                value={["0", "3000"]}
                autoComplete="off"
                defaultChecked
              />
              <label className="btn btn-outline-info" htmlFor="all-dates">
                All
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="last-5years"
                value={["2016", "2021"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="last-5years">
                Last 5 Years
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="last-10years"
                value={["2011", "2021"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="last-10years">
                Last 10 Years
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date50s"
                value={["1950", "1959"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date50s">
                50s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date60s"
                value={["1960", "1969"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date60s">
                60s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date70s"
                value={["1970", "1979"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date70s">
                70s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date80s"
                value={["1980", "1989"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date80s">
                80s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date90s"
                value={["1990", "1999"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date90s">
                90s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date2000s"
                value={["2000", "2009"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date2000s">
                2000s
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date2010s"
                value={["2010", "2019"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="date2010s">
                2010s
              </label>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <label className="form-label">Popularity</label>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="popularityAll"
                autoComplete="off"
                value={[0, 100000000]}
                defaultChecked
              />
              <label className="btn btn-outline-info" htmlFor="popularityAll">
                All
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="popular"
                autoComplete="off"
                value={[80000, 100000000]}
              />
              <label className="btn btn-outline-info" htmlFor="popular">
                Popular
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="common"
                autoComplete="off"
                value={[10000, 80000]}
                defaultChecked
              />
              <label className="btn btn-outline-info" htmlFor="common">
                Common
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="unknown"
                autoComplete="off"
                value={[0, 10000]}
              />
              <label className="btn btn-outline-info" htmlFor="unknown">
                Unknown/Rare
              </label>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <label className="form-label">Duration(minutes)</label>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="durationAll"
                autoComplete="off"
                value={[0, 100000]}
                defaultChecked
              />
              <label className="btn btn-outline-info" htmlFor="durationAll">
                All
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between0-100"
                autoComplete="off"
                value={[0, 100]}
              />
              <label className="btn btn-outline-info" htmlFor="between0-100">
                Up to 100
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between100-140"
                autoComplete="off"
                value={[100, 140]}
              />
              <label className="btn btn-outline-info" htmlFor="between100-140">
                100-140
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between140-180"
                autoComplete="off"
                value={[140, 180]}
              />
              <label className="btn btn-outline-info" htmlFor="between140-180">
                140-180
              </label>
            </div>
            <div className="col-auto">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="over180"
                autoComplete="off"
                value={[180, 100000]}
              />
              <label className="btn btn-outline-info" htmlFor="over180">
                Over 180
              </label>
            </div>
          </div>
        </div>

        {/*   <div className="m-3">
          <label className="form-label">Movie Country</label>

          <select name="movie-country" className="form-select" aria-label="Default select example">
            <option select="true" value={"allages"}>
              All
            </option>
            {countries.map((eachCountry, index) => {
              return (
                <option key={index} value={eachCountry}>
                  {eachCountry}
                </option>
              );
            })}
          </select>
        </div> */}

        <div className="d-grid gap-2 col-6 mx-auto mt-3">
          <Dropdown
            {...register("movie-country")}
            placeholder="Any & Select Country"
            fluid
            multiple
            selection
            search
            options={countriesArrayOfObjects}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Get IMDB Score
        </button>
      </form>
      <div className="container">
        Filmler
        {movieResults.map((movie, index) => {
          return (
            <div key={movie.imdb_title_id}>
              <button type="button" className="btn btn-lg btn-warning mb-1">
                {index}-{movie.original_title}, {movie.weighted_average_vote}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoChanceForm;
