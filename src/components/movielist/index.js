import React from "react";
import styled from 'styled-components';

import MovieItem from '../movieitem';

const MovieList = props => {
  const { movies, genres } = { ...props }
  return (
    <MoviesWrapper>
      {movies.map(movie => (
        <MovieItem
          key={movie.id}
          data={movie}
          genres={genres}
        />
      ))}
    </MoviesWrapper>
  )
}

const MoviesWrapper = styled.div`
  position: relative;
`

export default MovieList