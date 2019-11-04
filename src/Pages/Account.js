import React, {Component} from 'react'
import Banner from '../Components/Banner'

import  {NavItem}  from 'react-bootstrap';

import { Auth0Context } from '../react-auth0-spa.js';

let firebase = require('firebase');


  var config = {
    apiKey: "AIzaSyA5nE2t2SY6yHWrL0iduAg70awkOxRFr4g",
    authDomain: "newflights-32f5e.firebaseapp.com",
    databaseURL: "https://newflights-32f5e.firebaseio.com",
    projectId: "newflights-32f5e",
    storageBucket: "newflights-32f5e.appspot.com",
    messagingSenderId: "212819191910",
    appId: "1:212819191910:web:a96fe6557b48480efb25a7"
  };




class Account extends Component {
  // used in functional component :
  // const user = useContext(Auth0Context)
  static contextType = Auth0Context;
  static defaultProps = {
      clientID: "zwTGLcqiVpL6HBwXnTmp1y4ERpjUSggI",
      domain: "dev-muwdmw8b.eu.auth0.com"
    }

  constructor(props) {
    super(props);



  }
// {"theo2020":{"

  componentDidMount() {
    let bookedFlights = firebase.database().ref('savedFlights').child(this.context.user.nickname)

    bookedFlights.on('value', snapshot => {
      console.log(snapshot.val());

    })
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
