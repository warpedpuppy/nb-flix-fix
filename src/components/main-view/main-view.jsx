import React from "react";
import axios from "axios";
import propTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  Link,
} from "react-router-dom";

//import { render } from "react-dom/cjs/react-dom.production.min";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { Menubar } from "../navbar/navbar";
import { DirectorView } from "../director-view/director-view";

import "./main-view.scss";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);

    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://nixflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Container>
          <Row className="main-view justify-content-md-center">
            <Menubar user={user} />
            <Routes>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user) return;
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>;
                  // Before the movies have been loaded
                  if (movies.length === 0)
                    return movies.map((m) => (
                      <Col md={6} lg={3} key={m._id} className="movie-card">
                        <MovieCard movie={m} />
                      </Col>
                    ));
                }}
              />
              <Route
                path="/movies"
                render={() => {
                  return;
                  <Col>
                    <MainView />
                  </Col>;
                }}
              />
              <Route
                path="/register"
                render={() => {
                  return;
                  <Col>
                    <RegistrationView />
                  </Col>;
                }}
              />
              <Route
                path="/directors"
                render={() => {
                  return;
                  <Col>
                    <DirectorView />
                  </Col>;
                }}
              />
              <Route
                path="/movies/:movieId"
                render={({ match, history }) => {
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => {
                          history.goBack();
                        }}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/directors/:name"
                render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        movie={movies.find((m) => m.id === match.params.ed)}
                        onBackClick={() => {
                          history.goBack();
                        }}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path={`/users/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <ProfileView
                        movies={movies}
                        user={user}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path={`/user-update/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to="/" />;
                  return;
                  <Col>
                    <UserUpdate
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>;
                }}
              />
            </Routes>
          </Row>
        </Container>
      </Router>
    );
  }
}

//Log out button
<button
  onClick={() => {
    this.onLoggedOut();
  }}
>
  Logout
</button>;
