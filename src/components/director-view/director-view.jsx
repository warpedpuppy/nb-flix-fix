import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { PropTypes } from "react-bootstrap/esm/Image";
export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, directorMovies } = this.props;
    console.log(directors);
    return (
      <Container className="director-view">
        <Row>
          <Col className="value">
            <h1>{director.Director.Name}</h1>
            <p className="value">Birth: {director.Director.Birth}</p>

            {director.Director.Death > 0 && (
              <p className="value">Death: {director.Director.Death}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="value">{director.Director.Bio}</Col>
        </Row>

        <Row>
          <Col className="pt-3">
            <h3 className="label">Other {director.Director.Name} films:</h3>{" "}
            {directorMovies.map((movie) => (
              <Col lg={4}>
                <MovieCard key={movie._id} movie={movie}>
                  {movie.Title}
                </MovieCard>
              </Col>
            ))}
          </Col>
        </Row>
        <Button
          className="mt-4"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
