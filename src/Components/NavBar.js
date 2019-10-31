import React, {Component} from 'react'

import {Link} from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render(){
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
            <li>
              <Link to="/account">Account</Link>
            </li>

          </ul>

      </nav>
    )
  }
};

export default NavBar;
