import React from "react";

import { render } from "react-dom/cjs/react-dom.production.min";

import { MovieView } from "../movie-view/movie-view";

import { MovieCard } from "./movie-card/movie-card";

import posterANewHope from "/src/img/aNewHope.jpeg";

import posterFotR from "/src/img/fotr.jpeg";

import posterGladiator from "/src/img/gladiator.jpeg";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "A New Hope",
          Description:
            "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
          Director: {
            name: "George Lucas",
            bio: "Some info about George Lucas",
            born: 1944,
            hometown: "Modesto, CA",
          },
          Genre: "Action, Sci-fi",
          releaseYear: "1977",
          ImagePath: posterANewHope,
        },
        {
          _id: 2,
          Title: "Fellowship of the Ring",
          Description:
            "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
          Director: {
            name: "Peter Jackson",
            bio: "Some info about Peter Jackson",
            born: 1961,
            hometown: "Wellington, New Zealand",
          },
          Genre: "Action",
          releaseYear: "2001",
          ImagePath: posterFotR,
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description:
            "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
          Director: {
            name: "Ridley Scott",
            bio: "Some info about Rtidley Scot",
            born: 1937,
            hometown: "Durham, England",
          },
          Genre: "Action, History",
          releaseYear: "2000",
          ImagePath: posterGladiator,
        },
      ],
      selectedMovie: null,
    };
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
