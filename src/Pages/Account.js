import React, {Component} from 'react'
import Banner from '../Components/Banner'

import  {NavItem}  from 'react-bootstrap';

import Auth0Lock from 'auth0-lock';




class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      profile: {}
    }
  }

  static defaultProps = {
    clientID: "zwTGLcqiVpL6HBwXnTmp1y4ERpjUSggI",
    domain: "dev-muwdmw8b.eu.auth0.com"
  }

  componentDidMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain)

    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);

    this.lock.getProfile(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log(error);
        return;
      }
      this.setProfile(authResult.accessToken, profile);
    })
    })
    this.getProfile();
  }

  setProfile = (accessToken, profile) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
    console.log(this.state);
  }

  getProfile = () => {
    if(localStorage.getItem('accessToken' != null)) {
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      })
    }
  }

  showLock = () => {
    this.lock.show();
  }

  logout = () => {
    this.setState({
      accessToken: "",
      profile: {}
    }, () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('profile');
    });
  }




  render(){

    let log;
    if (this.state.accessToken === "") {
      log = <NavItem onClick={this.showLock} href="#">Login</NavItem>
    } else {
      log = <NavItem onClick={this.logout} href="#">Logout</NavItem>
    }

    return(
      <div>
        <Banner title="Click to access account">

      
          {log}


        </Banner>



      </div>
    )
  }
};

export default Account;
