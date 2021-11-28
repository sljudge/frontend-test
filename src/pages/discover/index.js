import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { produce } from 'immer';

import * as colors from "../../colors";
import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import Spinner from '../../images/spinner.gif'


const defaultState = {
  keyword: '',
  year: 0,
  results: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
  genreOptions: [123],
  ratingOptions: [
    { id: 7.5, name: 7.5 },
    { id: 8, name: 8 },
    { id: 8.5, name: 8.5 },
    { id: 9, name: 9 },
    { id: 9.5, name: 9.5 },
    { id: 10, name: 10 }
  ],
  languageOptions: [
    { id: 'GR', name: 'Greek' },
    { id: 'EN', name: 'English' },
    { id: 'RU', name: 'Russian' },
    { id: 'PO', name: 'Polish' }
  ]
};

const Discover = props => {
  const [data, setData] = useState(defaultState)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const { genreOptions, languageOptions, ratingOptions, totalCount, results } = data

  const loadPopularMovies = async (page = 1) => {
    const popularMovies = await fetcher.getPopularMovies(page)
    return popularMovies
  }

  const loadGenres = async () => {
    const genres = await fetcher.getGenres()
    return genres
  }

  const loadNewMovies = async (queryString, year) => {
    const results = await fetcher.getMoviesFromSearch(queryString, year)
    return results
  }

  const setMoviesAndGenres = (movies, genres) => {
    setData(
      produce(data, draftState => ({
        ...draftState,
        results: movies.results,
        totalCount: movies.total_results,
        totalPages: movies.total_pages,
        currentPage: movies.page,
        genreOptions: genres
      }))
    )
  }

  const preLoad = async () => {
    try {
      const movies = await loadPopularMovies()
      const genres = await loadGenres()
      setMoviesAndGenres(movies, genres)
    } catch (error) {
      console.log(error)
      alert('There has been an error with the application. Please try again later.')
    }
  }

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
  const handleMovieSearch = async (queryString, year) => {

    if (typeof year === undefined) {
      year = new Date.getFullYear()
    }

    setLoading(true)

    const newMovies = await loadNewMovies(queryString, year)

    updateResults(newMovies)

    setTimeout(() => {
      setLoading(false)
    }, 500);
  }

  const updateResults = (newData) => {
    setData(
      produce(data, draftState => ({
        ...draftState,
        results: newData.results,
        totalCount: newData.total_results,
        totalPages: newData.total_pages,
        currentPage: newData.page
      }))
    )
  }

  const updateFilters = (key = "", values = []) => {
    setFilters(
      produce(filters, draftState => ({
        ...draftState,
        [key]: values
      }))
    )
  }

  useEffect(() => {
    console.log('filters', filters)
  }, [filters])

  useEffect(() => {

    preLoad()

    return () => { }
  }, [])

  return (
    <DiscoverWrapper>
      <MobilePageTitle>Discover</MobilePageTitle>
      <MovieFilters>
        <SearchFilters
          data={data}
          genres={genreOptions || []}
          ratings={ratingOptions}
          languages={languageOptions}
          handleMovieSearch={handleMovieSearch}
          updateFilters={updateFilters}
        />
      </MovieFilters>
      {
        !loading ?
          <MovieResults>
            {totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
            <MovieList
              movies={results || []}
              genres={genreOptions || []}
            />
          </MovieResults>
          :
          <LoaderCont>
            <Loader src={Spinner} />
          </LoaderCont>
      }
    </DiscoverWrapper>
  )
}

const DiscoverWrapper = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  @media (max-width: 1000px){
      max-width: 100%;
      flex-direction: column;
      justify-content: start;
    }
`

const TotalCounter = styled.div`
  font-weight: 900;
  padding: 1rem 0;
`

const MovieResults = styled.div`
  position: relative;
`

const MovieFilters = styled.div`
`

const MobilePageTitle = styled.header`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 5rem;
  background-color: #fcfcfc;
  padding-left: 7rem;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  font-size: 2rem;
  z-index: 2;
  @media (min-width: 1200px){
    display: none;
  }
`

const LoaderCont = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items:center;
`

const Loader = styled.img`
  height: 3rem;
  width: auto;
`

export default Discover