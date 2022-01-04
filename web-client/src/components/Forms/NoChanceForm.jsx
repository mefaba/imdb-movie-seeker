import React, { useState } from "react";
import { Dropdown, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//import { Dropdown } from "semantic-ui-react";

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
  let navigate = useNavigate();

  const { setMovieResults } = props;

  const onSubmit = (data) => {
    console.log(data);
    movieLooker({
      gender: classGender.activeMale ? "males" : classGender.activeFemale ? "females" : "allgenders",
      ageGroup: data["age-group"],
      movieDate: data["movie-date"].split(","),
      popularity: data.popularity.split(","),
      duration: data.duration.split(","),
      movieCountry: data.country,
    });
    navigate("/movielist");
  };

  const { imdbData } = props;
  const [classGender, setClassGender] = useState({ activeMale: false, activeFemale: false });

  const movieLooker = (data) => {
    /* Bunch of Filter  */
    let matchedMovies = imdbData.filter((eachMovie) => {
      let dateFilter = data.movieDate[0] < eachMovie.year && eachMovie.year < data.movieDate[1];
      let popularityFilter =
        data.popularity[0] < eachMovie["total_votes"] && eachMovie["total_votes"] < data.popularity[1];
      let durationFilter = data.duration[0] < eachMovie["duration"] && eachMovie["duration"] < data.duration[1];

      return dateFilter && popularityFilter && durationFilter;
    });
    if (data.movieCountry && data.movieCountry.length) {
      matchedMovies = matchedMovies.filter((eachMovie) => {
        return eachMovie.country.split().some((r) => data.movieCountry.includes(r));
      });
    }

    /* Age and Gender Sort */
    let searchCriteria = `${data.gender}_${data.ageGroup}_avg_vote`;
    //let searchCriteria = `allgenders_${data.ageGroup}_avg_vote`;
    matchedMovies = matchedMovies.sort((a, b) => {
      //console.log(a[searchCriteria], b[searchCriteria]);
      if (a[searchCriteria] > b[searchCriteria]) {
        return -1;
      } else if (a[searchCriteria] < b[searchCriteria]) {
        return 1;
      }
      return 0;
    });

    console.log("matchedMovies:", matchedMovies);
    setMovieResults(matchedMovies);
  };

  const handleChange_gender = (gender) => {
    if (gender === "male") {
      setClassGender({ activeMale: !classGender.activeMale, activeFemale: false });
    } else {
      setClassGender({ activeMale: false, activeFemale: !classGender.activeFemale });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1>Select Filter</h1>
        </div>
        <div className="container">
          <label className="label">Gender</label>
          <div className="d-flex justify-content-center gender-container">
            <button
              type="button"
              className={`btn btn-secondary secondary-button mx-2 w-25 ${classGender.activeMale ? "active" : null}`}
              onClick={() => handleChange_gender("male")}
            >
              Male
            </button>
            <button
              type="button"
              className={`btn btn-secondary secondary-button mx-2 w-25 ${classGender.activeFemale ? "active" : null}`}
              onClick={() => handleChange_gender("female")}
            >
              Female
            </button>
          </div>
        </div>
        <div className="container">
          <label className="form-label">Age Group</label>
          <div className="age-container">
            <div className="form-check form-check-inline">
              <input
                {...register("age-group")}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="allages"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("age-group")}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="18age"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                18-29
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("age-group")}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="30age"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                30-45
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("age-group")}
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="45age"
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Over 45
              </label>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <label className="form-label">Release Date</label>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="all-dates"
                value={["0", "3000"]}
                autoComplete="off"
                defaultChecked
              />
              <label className="btn btn-outline-success" htmlFor="all-dates">
                All
              </label>
            </div>
            <div className="col-auto  m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="last-5years"
                value={["2016", "2021"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="last-5years">
                Last 5 Years
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="last-10years"
                value={["2011", "2021"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="last-10years">
                Last 10 Years
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date50s"
                value={["1950", "1959"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date50s">
                50s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date60s"
                value={["1960", "1969"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date60s">
                60s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check "
                {...register("movie-date")}
                id="date70s"
                value={["1970", "1979"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date70s">
                70s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date80s"
                value={["1980", "1989"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date80s">
                80s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date90s"
                value={["1990", "1999"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date90s">
                90s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date2000s"
                value={["2000", "2009"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date2000s">
                2000s
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("movie-date")}
                id="date2010s"
                value={["2010", "2019"]}
                autoComplete="off"
              />
              <label className="btn btn-outline-success" htmlFor="date2010s">
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
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="popularityAll"
                autoComplete="off"
                value={[0, 100000000]}
              />
              <label className="btn btn-outline-success" htmlFor="popularityAll">
                All
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="popular"
                autoComplete="off"
                value={[80000, 100000000]}
                defaultChecked
              />
              <label className="btn btn-outline-success" htmlFor="popular">
                Popular
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="common"
                autoComplete="off"
                value={[10000, 80000]}
              />
              <label className="btn btn-outline-success" htmlFor="common">
                Common
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("popularity")}
                id="unknown"
                autoComplete="off"
                value={[0, 10000]}
              />
              <label className="btn btn-outline-success" htmlFor="unknown">
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
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="durationAll"
                autoComplete="off"
                value={[0, 100000]}
                defaultChecked
              />
              <label className="btn btn-outline-success" htmlFor="durationAll">
                All
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between0-100"
                autoComplete="off"
                value={[0, 100]}
              />
              <label className="btn btn-outline-success" htmlFor="between0-100">
                Up to 100
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between100-140"
                autoComplete="off"
                value={[100, 140]}
              />
              <label className="btn btn-outline-success" htmlFor="between100-140">
                100-140
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="between140-180"
                autoComplete="off"
                value={[140, 180]}
              />
              <label className="btn btn-outline-success" htmlFor="between140-180">
                140-180
              </label>
            </div>
            <div className="col-auto m-1">
              <input
                type="radio"
                className="btn-check"
                {...register("duration")}
                id="over180"
                autoComplete="off"
                value={[180, 100000]}
              />
              <label className="btn btn-outline-success" htmlFor="over180">
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

        <div className="container">
          <div className="row">
            <label className="form-label">Country of Origin</label>
          </div>
          <div className="age-container text-center">
            <Dropdown autoClose="outside" id="dropdown-basic-button" title="Dropdown button" drop={"up"}>
              <Dropdown.Toggle className="w-100">Select</Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {countriesArrayOfObjects.map((eachCountryObject, index) => {
                  return (
                    <div className="form-check m-1" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={eachCountryObject.value}
                        id={eachCountryObject + index}
                        name="country"
                        {...register("country")}
                      />
                      <label className="form-check-label" htmlFor={eachCountryObject + index}>
                        {eachCountryObject.value}
                      </label>
                    </div>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* <Dropdown
            {...register("movie-country")}
            placeholder="Any & Select Country"
            fluid
            multiple
            selection
            search
            options={countriesArrayOfObjects}
            onChange={handleChange}
          /> */}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary m-3">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoChanceForm;
