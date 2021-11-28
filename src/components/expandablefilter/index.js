import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from 'styled-components';
import { debounce } from 'lodash'

import Checkbox from "../checkbox";

const ExpandableFilter = props => {
  const { options, text, filterKey, updateFilters } = { ...props }
  const [filtersShown, setFiltersShown] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  const handleExpandableTitleClick = () => setFiltersShown(!filtersShown)

  const handleActiveFilterChange = (filterKey, activeFilters) => {
    updateFilters(filterKey, activeFilters)
  }

  useEffect(() => {
    handleActiveFilterChange(filterKey, activeFilters)
  }, [activeFilters])

  return (
    <ExpandableFilterCont>
      <ExpandableFilterTitle onClick={handleExpandableTitleClick}>
        <ExpandableFilterIcon>{filtersShown ? '-' : '+'}</ExpandableFilterIcon>
        {text}
      </ExpandableFilterTitle>
      <ExpandableFilterOptionsContainer show={filtersShown}>
        {options.map(option =>
          <Checkbox
            key={`${filterKey}${option.id}`}
            name={option.name}
            id={option.id}
            activeFilters={{ get: activeFilters, set: setActiveFilters }} />
        )}
      </ExpandableFilterOptionsContainer>
    </ExpandableFilterCont>
  )
  // You need to create your own checkbox component with a custom checkmark
}

const ExpandableFilterCont = styled.div`

`
const ExpandableFilterTitle = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
`
const ExpandableFilterIcon = styled.span`
  font-size: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`
const ExpandableFilterOptionsContainer = styled.div`
  overflow: hidden;
  ${props => css`
    height: ${props.show ? 'auto' : '0'}
  `}
`


export default ExpandableFilter