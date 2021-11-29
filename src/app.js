import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import './css/app.css';
import * as colors from './colors'

CSSPlugin.defaultTransformPerspective = 1000;

const App = props => {
  const [sidebarOpen, setSideBarOpen] = useState(window.innerWidth > 1200)
  const [sidebarOpenTimeline, setSidebarOpenTimeline] = useState(gsap.timeline({ paused: true }))
  const sidebarRef = useRef(null)

  /* Write the necessary functions to show and hide the side bar on small devices */

  const openCloseSidebar = () => {
    sidebarOpenTimeline.reversed(!sidebarOpenTimeline.reversed());
  }

  const handleContentClick = () => {
    setSideBarOpen(false)
  }

  useEffect(() => {
    openCloseSidebar()
  }, [sidebarOpen])

  useEffect(() => {
    sidebarOpenTimeline
      .to(sidebarRef.current, { width: '250px', minWidth: '250px', ease: "expo.inOut", duration: .5 })
      .reverse()
  }, [])

  return (
    <Router>
      <PageContainer>
        <SideNavBar {...props} ref={sidebarRef} isOpen={{ get: sidebarOpen, set: setSideBarOpen }} />
        <ContentWrapper onClick={handleContentClick}>
          <Switch>
            <Route path="/discover" component={Discover} {...props} />
          </Switch>
        </ContentWrapper>
      </PageContainer>
    </Router>
  );
}

const PageContainer = styled.main`
  overflow: hidden;
  background-color: ${colors.lightBackground};
  display: flex;
  height: 100vh;
`

const ContentWrapper = styled.main`
  flex-grow: 1;
  display: flex;
  background-color: ${colors.lightBackground};
  padding: 5rem 2rem 0;
  overflow-y: scroll;
  overflow-x: hidden;
  @media (min-width: 1200px){
    padding: 2rem;
  }
  @media (max-width: 600px){
    padding: 5rem 1rem;
  }
`


export default App