import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from 'styled-components';
import { debounce } from 'lodash'

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";

const SearchBar = props => {
    const { handleMovieSearch, showExtraConfigurations } = { ...props }
    const [queryStringValue, setQueryStringValue] = useState("")
    const [yearValue, setYearValue] = useState("")

    const toggleExtraConfigurations = () => showExtraConfigurations.set(!showExtraConfigurations.get)

    const handleKeyWordChange = (e) => setQueryStringValue(e.target.value)

    const handleYearChange = (e) => {
        setYearValue(e.target.value)
    }

    const handleYearKeyPress = (e) => {
        const character = String.fromCharCode(e.which || e.charCode || e.keyCode || 0)
        if (!character.match(/[0-9]/)) { e.preventDefault() }
    }

    const debouncedMovieSearch = useCallback(
        debounce((keyWord, year) => {
            handleMovieSearch(keyWord, year)
        }, 1000),
        []
    )

    useEffect(() => {
        if (queryStringValue) {
            debouncedMovieSearch(queryStringValue, yearValue)
        }
    }, [queryStringValue, yearValue])

    return (
        <SearchBarWrapper>
            <SearchBarInputCont>
                <SearchBarInputRow>
                    <Icon src={SearchIcon} alt="" />
                    <SearchBarInput
                        value={queryStringValue}
                        placeholder="Search"
                        onChange={handleKeyWordChange} />
                    <Icon src={FilterIcon} alt="" filter onClick={toggleExtraConfigurations} />
                </SearchBarInputRow>
                <SearchBarInputRow mobileHide show={showExtraConfigurations.get}>
                    <Icon src={CalendarIcon} alt="" />
                    <SearchBarInput
                        value={yearValue}
                        placeholder="Year of release"
                        onChange={handleYearChange}
                        onKeyPress={handleYearKeyPress}
                        maxLength={4}
                        pattern="[0-9]{4}" />
                </SearchBarInputRow>
            </SearchBarInputCont>
        </SearchBarWrapper>
    )
}

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SearchBarInputCont = styled.div`
    flex-grow: 1;
    max-width: 100%;
`

const SearchBarInputRow = styled.div`
    display: flex;
    align-items:center;
    border-bottom: 2px solid ${colors.primaryColor};
    margin: 1rem 0;
    transition: all .3s ease-in-out;
    ${props => props.mobileHide && !props.show && css`
        @media (max-width: 1000px){
            height: 0;
            overflow: hidden;
            padding: 0;
            border: none;
            opacity: 0;
        }
    `}
`

const SearchBarInput = styled.input`
    width: 100%;
    flex-grow: 1;
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0 1rem;
    color: ${colors.primaryColor};
    height: 3rem;
    &::placeholder{
        opacity: 0.5;
        font-weight: normal;
    }
`

const Icon = styled.img`
    height: 1.5rem;
    width: auto;
    ${props => props.filter && css`
        @media (min-width: 1000px){
            display: none;
        }
    `}
`

export default SearchBar