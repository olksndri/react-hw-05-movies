import css from "../styles/SharedLayout.module.css";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Suspense } from "react";

const StyledNavLink = styled(NavLink)`
  font-size: 22px; 
  color: black;
  &.active {
    color: orange;
  }
`;

const SharedLayout = () => { 

    return ( 
        <>
            <nav className={css.nav}>
                <div className={css['nav-links-wrapper']}>
                    <StyledNavLink to="/">Home</StyledNavLink> 
                    <StyledNavLink to="/movies">Movies</StyledNavLink> 
                </div>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet/>
            </Suspense>
        </>
    )
}

export default SharedLayout; 