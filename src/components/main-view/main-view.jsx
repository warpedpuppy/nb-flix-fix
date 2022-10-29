import React from "react";
import axios from "axios";
import propTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
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
      user: authData.user,
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
    const { movies, movie, user, selectedMovie } = this.state;
    console.log("Movies: ", movies);
    console.log("User: ", user);
    console.log("Director: ", movies.Director);

    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view d-flex justify-content-center pb-5 px-3 pt-3">
            <Routes>
              <Route
                path="/"
                element={
                  !user ? (
                    <Container>
                      <Row>
                        <Col className="m-4">
                          <LoginView
                            onLoggedIn={(user) => this.onLoggedIn(user)}
                          />
                        </Col>
                      </Row>
                    </Container>
                  ) : !movies.length ? (
                    <div>No movies</div>
                  ) : (
                    movies.map((m) => (
                      <Col key={m._id} className="movie-card">
                        <MovieCard movie={m} />
                      </Col>
                    ))
                  )
                }
              />
              <Route
                path="/register"
                element={
                  user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col lg={8} md={8}>
                      <RegistrationView />
                    </Col>
                  )
                }
              />
              <Route
                path={`/users/:name`}
                element={
                  !user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col lg={8} md={8}>
                      <ProfileView movies={movies} user={user} />
                    </Col>
                  )
                }
              />

              <Route
                path="/movies/:movieId"
                element={({ match, history }) => {
                  <Col md={6}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>;
                }}
              />
              <Route
                path={`/genre:name`}
                element={({ match, history }) => {
                  !user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col lg={8} md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path={`/director:name`}
                element={({ match, history }) => {
                  !user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col lg={8} md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
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
