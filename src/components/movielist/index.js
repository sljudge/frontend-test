import React from "react";
import styled from 'styled-components';

import MovieItem from '../movieitem';

const MovieList = props => {
  const { movies, genres } = { ...props }
  return (
    <MoviesWrapper>
      {/* Finish the MovieItem component and use it here to display the movie results */}
    </MoviesWrapper>
  )
}

const MoviesWrapper = styled.div`
  position: relative;
`

export default MovieList