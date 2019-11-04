import React, {Component} from 'react'
import Banner from '../Components/Banner'

import  {NavItem}  from 'react-bootstrap';

import { Auth0Context } from '../react-auth0-spa.js';






class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static defaultProps = {
    clientID: "zwTGLcqiVpL6HBwXnTmp1y4ERpjUSggI",
    domain: "dev-muwdmw8b.eu.auth0.com"
  }

  static contextType = Auth0Context;
  // used in functional component :
  // const user = useContext(Auth0Context)

  componentDidMount() {


  }







  render(){

    let account, info;

    if (this.context.user !== undefined) {
      account =
          <h3> Welcome {
            <Auth0Context.Consumer>
              {context => (
            <span>{context.user.email}</span>
              )}
            </Auth0Context.Consumer>
          }</h3>

        info =
          <h4>Please see below for booked flights</h4>

      } else {
        account =
            <h3>Please log in to see details of your account</h3>
        info = ""
      }



      return(
        <div>
          <Banner title="Click to access account">

            {account}

          </Banner>

            {info}
        </div>
      )







  }
};

export default Account;
