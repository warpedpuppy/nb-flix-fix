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
import { GenreView } from "../genre-view/genre-view";

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
      FavoriteMovies: [],
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      let user = localStorage.getItem("user");
      this.setState({
        user: JSON.parse(user),
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
    console.log("authData from onLoggedIn function", authData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    this.setState({
      user: authData.user.Username,
    });
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

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  rootPath(user) {
    if (!user) return <LoginView />;
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view d-flex justify-content-center pb-5 px-3 pt-3">
            <Routes>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user) {
                    return (
                      <Container>
                        <Row>
                          <Col className="m-4">
                            <LoginView
                              onLoggedIn={(user) => this.onLoggedIn(user)}
                            />
                          </Col>
                        </Row>
                      </Container>
                    );
                  }
                  if (movies.length === 0) {
                    return (
                      <Container>
                        <Row>
                          <Col className="d-flex justify-content-center">
                            The list is empty!
                          </Col>
                        </Row>
                      </Container>
                    );
                  }
                }}
              />
              <Route
                path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col lg={8} md={8}>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />

              <Route
                exact
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
                exact
                path="/movies/:id"
                render={({ match, history }) => {
                  return (
                    <Col className="pt-4">
                      <MovieView
                        movie={movies.find((m) => m._id === match.params.id)}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/genres/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genreMovies={movies.filter(
                          (movie) => movie.Genre.Name === match.params.name
                        )}
                        genre={movies.find(
                          (m) => m.Genre.Name === match.params.name
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/directors/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        directorMovies={movies.filter(
                          (movie) => movie.Director.Name === match.params.name
                        )}
                        director={movies.find(
                          (m) => m.Director.Name === match.params.name
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </Routes>
          </Row>
        </Container>
      </Router>
    );
  }
}
