import React, { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { getMovieImageURL } from "../../fetcher";
import * as colors from '../../colors'

const MovieItem = props => {
  const { data, genres } = { ...props }
  const { poster_path, original_title, overview, release_date, genre_ids, vote_average } = { ...data }
  const [posterImageURL, setPosterImageURL] = useState()
  const [genreStrings, setGenreStrings] = useState([])

  const loadPosterImage = (path) => {
    const imageURL = getMovieImageURL(path, 200)
    setPosterImageURL(imageURL)
  }

  const loadGenreStrings = () => {
    const newGenreStrings = []
    genre_ids.forEach(id => {
      const genreName = genres.filter(genre => genre.id === id)[0]
      if (genreName) {
        newGenreStrings.push(genreName.name)
      }
    })
    setGenreStrings(newGenreStrings)
  }

  const handleGenreLinkClick = (id) => {
    console.log('GENRE CLICK', id)
  }

  useEffect(() => {
    loadGenreStrings()
    return () => { }
  }, [genre_ids, genres])

  useEffect(() => {
    loadPosterImage(poster_path)
    return () => { }
  }, [poster_path])

  return (
    // Complete the MovieItem component
    <MovieItemWrapper>
      <LeftCont>
        <MovieImage src={posterImageURL} alt="" />
      </LeftCont>
      <RightCont>
        <MovieDetailsCont>
          <div>
            <MovieTitle>{original_title}</MovieTitle>
            <Genres>
              {genreStrings.map((id, i) => (
                <GenreLink key={`g-${id}`} onClick={() => handleGenreLinkClick(id)}>
                  {id}{i < genreStrings.length - 1 && <GenreLinkSeparator>|</GenreLinkSeparator>}
                </GenreLink>
              ))}
            </Genres>
          </div>
          <MovieScore>{vote_average}</MovieScore>
        </MovieDetailsCont>
        <MovieOverview>{overview}</MovieOverview>
        <MovieReleaseDate>{release_date}</MovieReleaseDate>
      </RightCont>
    </MovieItemWrapper>
  )
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  display: flex;
  margin: 0 0 2rem;
  padding: 1rem;
  box-shadow: 1px 3px 10px 0px rgba(0,0,0,0.1);
  @media (max-width:600px){
    padding: 0.25rem;
  }
`

const LeftCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RightCont = styled.div`
  position: relative;
  flex-grow: 1;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  @media (max-width: 600px){
    padding: 0.5rem;
  }
`

const MovieDetailsCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const MovieTitle = styled.h2`
  font-weight: 800;
  font-size: 1.5rem;
  @media (max-width: 600px){
    font-size: 1rem;
  }
`

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: ${colors.primaryColor};
  padding: 0.5rem 0;
  @media (max-width: 600px){
    font-size: 0.75rem;
  }
`

const GenreLink = styled.a`
  cursor: pointer;
`

const GenreLinkSeparator = styled.span`
  margin: 0 0.25rem;
`

const MovieScore = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: ${colors.primaryColor};
  @media (max-width: 600px){
    font-size: 0.75rem;
    padding: 0.25rem;
  }
`

const MovieImage = styled.img`
  @media (max-width: 600px){
    width: 150px;
  }
  @media (max-width: 450px){
    width: 100px;
  }
`

const MovieOverview = styled.p`
  flex-grow: 1;
  font-size: 1.15rem;
  @media (max-width: 600px){
    font-size: 0.75rem;
  }
`
const MovieReleaseDate = styled.p`
  color: ${colors.primaryColor}
`

export default MovieItem