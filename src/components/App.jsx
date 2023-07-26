import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { lazy } from "react";
import Home from "./Home";
import SharedLayout from "./SharedLayout";

const NotFound = lazy(() => import("./NotFound")); 
const Movies = lazy(() => import("./Movies")); 
const MovieDetails = lazy(() => import("./MovieDetails")); 
const Cast = lazy(() => import("./Cast")); 
const Reviews = lazy(() => import("./Reviews")); 

export const StyledLink = styled(Link)`
  font-size: 18px; 
  color: black;
`

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <SharedLayout /> }>
          <Route index element={ <Home /> }/>
          <Route path='movies' element={ <Movies /> }/>
          <Route path='movies/:movieId' element={ <MovieDetails />}>
            <Route path='cast' element={ <Cast /> }/>
            <Route path='reviews' element={ <Reviews /> }/>
          </Route>
          <Route path='*' element={ <NotFound/> }/>
        </Route>
      </Routes>
    </>
  );
};
