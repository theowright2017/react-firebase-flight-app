import React, {Component} from 'react'


import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import {NavItem} from 'react-bootstrap';

const NavBar = () => {


    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return(
      <nav className="navbar">

          <div>
            <Link to="/">
              <h3>FlightChecker</h3>
            </Link>


          </div>
          <ul className="links">
            <li>
              <Link to="/search">Search</Link>
            </li>


                {!isAuthenticated && (
                <NavItem
                  onClick={() =>
                    loginWithRedirect({})
                  }
                >
                  Log in
                </NavItem>
              )}
              {isAuthenticated && <NavItem onClick={() => logout()}>Log out</NavItem>}



          </ul>

      </nav>
    )
  }


export default NavBar;
