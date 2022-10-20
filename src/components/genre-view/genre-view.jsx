import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, genreMovies } = this.props;

    return (
      <div>
        <Container className="genre-view">
          <Row>
            <Col className="value">
              <h1>{genre.Genre.Name}</h1>
            </Col>
          </Row>
          <Row>
            <p className="value">{genre.Genre.Description}</p>
          </Row>
          <Row>
            <Col className="label">
              <h3>Other {genre.Genre.Name} films: </h3>
              {genreMovies.map((movie) => (
                <Col lg={3}>
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
      </div>
    );
  }
}
