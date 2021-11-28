import React, { forwardRef } from "react";
import styled, { css } from 'styled-components';
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";
import Hamburger from "../../images/hamburger.png";


const SideNavBar = forwardRef((props, ref) => {
  const { isOpen } = { ...props }

  const handleHamburgerClick = () => {
    isOpen.set(!isOpen.get)
  }

  return (
    <>
      <SideBarHamburger onClick={handleHamburgerClick} />
      <SideNavBarCont ref={ref} className={isOpen ? 'visible' : ''}>
        {/* Implement a hamburger icon slide in effect for small devices */}
        <SideNavMainLink className="menu_nav_link main_nav_link" to="/" exact>
          Wesley
          <NavIcon arrow></NavIcon>
        </SideNavMainLink>
        <SideNavMainLink className="menu_nav_link" to="/discover">
          Discover
          <NavIcon search></NavIcon>
        </SideNavMainLink>
        <SideNavHeader>
          <HeaderText>Watched</HeaderText>
        </SideNavHeader>
        <NavLink className="menu_nav_link" to="/watched/movies">Movies</NavLink>
        <NavLink className="menu_nav_link" to="/watched/tv-shows">Tv Shows</NavLink>
        <SideNavHeader><HeaderText>Saved</HeaderText></SideNavHeader>
        <NavLink className="menu_nav_link" to="/saved/movies">Movies</NavLink>
        <NavLink className="menu_nav_link" to="/saved/tv-shows">Tv Shows</NavLink>
      </SideNavBarCont>
    </>
  );
})

const SideBarHamburger = styled.button`
  background-image: url(${Hamburger});
  min-width: 3rem;
  min-height: 3rem;
  position: fixed;
  z-index: 10;
  top: 1rem;
  left: 2rem;
  background-size: contain;
  padding: 0.25rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;  
  &:hover{
    background-color: #ebecf0;
    border-radius: 1000%;
  }
  @media (min-width: 1200px){
    display: none;
  }
`

const SideNavBarCont = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1rem 0;
  z-index: 9;
  width: 250px;
  min-width: 250px;
  height: 100%;
  background-color: ${colors.sideNavBar};
  &:hover {
    background-color: ${colors.sideNavBarHover};
  }
  @media (max-width: 1200px){
    position: fixed;
    margin-top: 5rem;
    min-width: unset;
    width: 0;
  }
`

const SideNavMainLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.primaryColor};
  }
`

const NavIcon = styled.div`
  margin-top: 0.5rem;
  ${props => `
    background-image: url(${props.arrow ? Arrow : props.search ? SearchWhite : ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 1.5rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    max-height: 1.5rem;
  `}
`

const SideNavHeader = styled.div`
  padding: 1rem 0;
  margin: 0 0 0 2rem;
  border-bottom: 1px solid rgba(256,256,256,0.5);
`

const HeaderText = styled.div`
  font-size: 1.6em;
  font-weight: 700;
  color: white;
`

const NavLink = styled(Link)`
  padding: 0.5rem 2rem;
  display: block;
  font-size: 1.4em;
  font-weight: 200;
  color: white;
  opacity: 0.75;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.primaryColor};
    opacity: .9
  }
`

export default SideNavBar