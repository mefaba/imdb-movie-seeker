//import logo from "./assets/logo.svg";
import { useEffect, useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar";
import { Switch, Route, Link } from "react-router-dom";
import { HeardMovieForm, NoChanceForm, PickForMeForm } from "./components/Forms";
import axios from "axios";

function App() {
  const [imdbData, setImdbData] = useState("");
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
    <div className="App container">
      <Navbar />
      <div className="container mt-3">
        <div className="d-grid gap-2 col-6 mx-auto">
          <Link to="/heardamovie" className="btn btn-primary" type="button">
            I heard a movie
          </Link>

          <Link to="/nochance" className="btn btn-primary">
            Don't take any chances
          </Link>

          <Link to="/pickforme" className="btn btn-primary" type="button">
            Pick for me!
          </Link>
        </div>
      </div>

      <Switch>
        <Route path="/heardamovie">
          <HeardMovieForm imdbData={imdbData} />
        </Route>
        <Route path="/nochance">
          <NoChanceForm imdbData={imdbData} />
        </Route>
        <Route path="/pickforme">
          <PickForMeForm imdbData={imdbData} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
