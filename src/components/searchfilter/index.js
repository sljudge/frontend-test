import React, { useState } from "react";
import styled, { css } from 'styled-components';

import * as colors from "../../colors";
import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";

const SearchFilters = props => {
  const { genres, ratings, languages, handleMovieSearch, updateFilters, data } = { ...props }
  const [showExtraConfigurations, setShowExtraConfigurations] = useState(window.innerWidth > 1000)

  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont">
        <SearchBar
          data={data}
          handleMovieSearch={handleMovieSearch}
          showExtraConfigurations={{ get: showExtraConfigurations, set: setShowExtraConfigurations }} />
      </SearchFiltersCont>
      <SearchFiltersCont mobileHide show={showExtraConfigurations}>
        <CategoryTitle>Movies</CategoryTitle>
        <ExpandableFilter
          filterKey="genre"
          text="Select genre(s)"
          options={genres}
          updateFilters={updateFilters} />
        <ExpandableFilter
          filterKey="ratings"
          text="Select min. vote"
          options={ratings}
          updateFilters={updateFilters} />
        <ExpandableFilter
          filterKey="language"
          text="Select language"
          options={languages}
          updateFilters={updateFilters} />
      </SearchFiltersCont>
    </FiltersWrapper>
  )
}

const FiltersWrapper = styled.div`
  box-shadow: 1px 3px 10px 0px rgba(0,0,0,0.1);
  position: relative;
  min-width: 230px;
  max-width: 230px;
  margin-left: 1rem;
  @media (max-width: 1000px){
    max-width: 100%;
  }
`

const SearchFiltersCont = styled.div`
  background-color: white;
  border-radius: 3px;
  transition: all .3s ease-in-out;
  padding: 0 1rem;
  
  ${props => props.mobileHide && !props.show && css`
    @media (max-width: 1000px){
      height: 0;
      overflow: hidden;
      padding: 0;
      opacity: 0;
    }
  `}
`

const CategoryTitle = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`

export default SearchFilters