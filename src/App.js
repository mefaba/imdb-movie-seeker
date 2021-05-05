//import logo from "./assets/logo.svg";
import "./App.scss";
import { Navbar } from "./components/Navbar";
import { Switch, Route, Link } from "react-router-dom";
import { HeardMovieForm, NoChanceForm, PickForMeForm } from "./components/Forms";

function App() {
  return (
    <div className="App">
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
          <HeardMovieForm />
        </Route>
        <Route path="/nochance">
          <NoChanceForm />
        </Route>
        <Route path="/pickforme">
          <PickForMeForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
