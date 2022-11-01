import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";

import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export function MovieView(props) {
  // state = { movie: {} };
  // keypressCallback(event) {
  //   console.log(event.key);
  // }
  let [movie, setMovie] = useState({});
  //componentDidMount() {
  document.addEventListener("keypress", this.keypressCallback);
  const { id } = useParams();
  console.log(id);
  let film = props.movies.find((m) => m._id === id);
  //setMovie(film);
  //}

  // render() {
  console.log("Movie: ", movie);
  return <h1>Hello</h1>;

  return (
    <div className="movie-view">
      <Row>
        <Col>
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="movie-featured">
            <span className="label">Featured: </span>
            <span className="value">{movie.featured ? "true" : "false"}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Actors: PropTypes.array,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }),
  onBackClick: PropTypes.func,
};
