import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    console.log("movie view", movie);
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
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-director">
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
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
        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
